const { encryptImageUrl } = require('../utils/imageToken');

/**
 * Fields whose values are treated as image paths/URLs to be encrypted.
 */
const IMAGE_URL_FIELDS = new Set([
    'imageUrl',
    'image',
    'thumbnail',
    'thumbnailUrl',
    'poster',
    'banner',
    'logo',
    'logoUrl',
    'avatar',
    'icon',
    'iconUrl',
    'backgroundImage',
    'coverImage',
    'bgImage',
    'backgroundUrl',
    'patternUrl',
    'videoUrl',
    'src',
    'background',
]);

/**
 * Returns true if the value looks like an image path or URL.
 * Handles:
 *  - Absolute URLs: "https://cdn.com/photo.jpg"
 *  - Relative paths: "/hero-bg-2.png", "images/photo.webp"
 *  - Common image extensions
 */
const looksLikeImagePath = (value) => {
    if (typeof value !== 'string' || value.trim() === '') return false;
    const imageExtensions = /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico|tiff?)(\?.*)?$/i;
    const isAbsoluteUrl = value.startsWith('http://') || value.startsWith('https://');
    const isRelativePath = value.startsWith('/') || value.startsWith('./') || value.startsWith('../');
    return (isAbsoluteUrl || isRelativePath) && imageExtensions.test(value);
};

/**
 * Recursively walk through any object/array and replace image fields
 * with encrypted proxy URLs.
 */
const encryptImagesInObject = (obj, baseUrl, frontendOrigin, pathPrefix = '') => {
    if (Array.isArray(obj)) {
        return obj.map((item) => encryptImagesInObject(item, baseUrl, frontendOrigin, pathPrefix));
    }

    if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            if (IMAGE_URL_FIELDS.has(key) && looksLikeImagePath(value)) {
                // Resolve to full URL if it's a relative path
                let fullUrl = value;
                if (!value.startsWith('http')) {
                    // Use frontend origin (e.g. http://localhost:5173) for relative paths
                    const origin = frontendOrigin || baseUrl;
                    fullUrl = `${origin}${value.startsWith('/') ? '' : '/'}${value}`;
                }
                // Encrypt and replace with proxy URL
                const token = encryptImageUrl(fullUrl);

                // Construct hierarchical path: /img/page/section/element/token
                const prefix = pathPrefix ? `${pathPrefix}/` : '';
                result[key] = `${baseUrl}/img/${prefix}${token}`;
            } else {
                result[key] = encryptImagesInObject(value, baseUrl, frontendOrigin, pathPrefix);
            }
        }
        return result;
    }

    return obj;
};

/**
 * Express middleware — intercepts res.json() and encrypts all image paths
 * before sending to the client. Works for both absolute URLs and relative paths.
 */
const imageEncryptMiddleware = (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = (body) => {
        try {
            if (body && typeof body === 'object') {
                // Use SERVER_URL from .env so encrypted proxy URLs always use the real
                // server address (e.g. http://192.168.1.10:5000), not whatever the
                // Host header says (which could be 'localhost' from internal calls).
                const baseUrl = process.env.SERVER_URL ||
                    `${req.protocol}://${req.get('host')}`;
                const frontendOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

                // Get path hierarchy from request (e.g. /home/hero/background -> home/hero/background)
                const pathPrefix = req.path.replace(/^\/|\/$/g, '');

                body = encryptImagesInObject(body, baseUrl, frontendOrigin, pathPrefix);
            }
        } catch (err) {
            console.error('[ImageEncrypt] Error encrypting image URLs:', err.message);
        }
        return originalJson(body);
    };

    next();
};

module.exports = imageEncryptMiddleware;
