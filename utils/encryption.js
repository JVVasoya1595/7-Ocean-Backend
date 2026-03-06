const crypto = require('crypto');
const { encryptImageUrl } = require('./imageToken');
const { pathStorage } = require('../middleware/pathContext');

// ─────────────────────────────────────────────────────────────────────────────
// Image URL Pre-processing (Replaces URLs with proxy URLs before AES encryption)
// ─────────────────────────────────────────────────────────────────────────────
const IMAGE_FIELDS = new Set([
    'imageUrl', 'image', 'thumbnail', 'poster', 'banner', 'logo', 'avatar', 'icon', 'backgroundImage', 'coverImage',
    'src', 'background', 'iconUrl', 'bgImage', 'patternUrl', 'backgroundUrl', 'videoUrl', 'thumbnailUrl', 'url', 'logoUrl'
]);

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico|tiff?|mp4|webm|ogg|mov)(\?.*)?$/i;

const looksLikeImage = (v) => {
    if (typeof v !== 'string' || !v.trim()) return false;
    return (v.startsWith('http') || v.startsWith('/') || v.startsWith('./')) && IMAGE_EXT_RE.test(v);
};

const replaceImageUrls = (obj, serverUrl, frontendOrigin, pathPrefix = '') => {
    // Handle bare strings (e.g. asking directly for /items/0/imageUrl)
    if (typeof obj === 'string' && looksLikeImage(obj)) {
        const fullUrl = obj.startsWith('http') ? obj : `${frontendOrigin}${obj.startsWith('/') ? '' : '/'}${obj}`;
        const prefix = pathPrefix ? `${pathPrefix}/` : '';
        return `${serverUrl}/img/${prefix}${encryptImageUrl(fullUrl)}`;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => replaceImageUrls(item, serverUrl, frontendOrigin, pathPrefix));
    }

    if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            const prefix = pathPrefix ? `${pathPrefix}/` : '';
            // Encrypt if field name matches OR if it's 'content' of type image, and value looks like an image
            if ((IMAGE_FIELDS.has(key) || (key === 'content' && obj.type === 'image')) && typeof value === 'string' && looksLikeImage(value)) {
                const fullUrl = value.startsWith('http') ? value : `${frontendOrigin}${value.startsWith('/') ? '' : '/'}${value}`;
                result[key] = `${serverUrl}/img/${prefix}${encryptImageUrl(fullUrl)}`;
            } else {
                result[key] = replaceImageUrls(value, serverUrl, frontendOrigin, pathPrefix);
            }
        }
        return result;
    }
    return obj;
};


// The encryption key should be 32 bytes (256 bits hexadecimal) for aes-256-cbc.
// CRITICAL: Must always be set in .env as ENCRYPTION_KEY
if (!process.env.ENCRYPTION_KEY) {
    throw new Error(
        'ENCRYPTION_KEY environment variable is not set. ' +
        'This is critical for security. Set it in your .env file.'
    );
}
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const IV_LENGTH = 16; // For AES, this is always 16

// ─────────────────────────────────────────────────────────────────────────────
// Core encrypt / decrypt
// ─────────────────────────────────────────────────────────────────────────────
const encrypt = (data) => {
    if (data !== null && typeof data === 'object') {
        // Convert Mongoose documents (which have circular refs) to plain JS objects
        // JSON.parse(JSON.stringify()) safely strips all circular prototype chains
        try {
            data = JSON.parse(JSON.stringify(data));
        } catch {
            // If serialization fails, use data as-is
            data = data;
        }
    }

    const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
    const frontendOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

    // Get the current request path hierarchy
    let pathPrefix = '';
    if (pathStorage && typeof pathStorage.getStore === 'function') {
        pathPrefix = pathStorage.getStore() || '';
    }

    // Replace images with proxy URLs BEFORE AES-encryption
    data = replaceImageUrls(data, serverUrl, frontendOrigin, pathPrefix);

    // AES-256-CBC encrypt the payload
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    const stringData = typeof data === 'object' ? JSON.stringify(data) : data;
    const encrypted = Buffer.concat([cipher.update(stringData), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text) => {
    if (!text) return null;
    let textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    const str = decrypted.toString();
    try {
        return JSON.parse(str);
    } catch {
        return str;
    }
};

module.exports = { encrypt, decrypt };
