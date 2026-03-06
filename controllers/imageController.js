const { decryptImageUrl } = require('../utils/imageToken');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

// Local public folder — put your images here so the proxy can serve them directly
// without needing the Vite dev server to be reachable.
// Path: e:\7-oceans-backend\public\
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// The frontend origin (e.g. http://192.168.1.10:5173)
// Images whose URL starts with this origin are first looked up locally.
const FRONTEND_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Allowed image extensions for local serving
const IMAGE_MIME = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.bmp': 'image/bmp',
};

// @desc    Serve image via encrypted token proxy
// @route   GET /img/:token
// @access  Public (used as <img src="..."> — no auth header available)
const serveImage = (req, res) => {
    // Extract token from the last segment of the path
    // Path looks like: /home/hero/background/<token>
    const pathSegments = req.path.split('/').filter(Boolean);
    const token = pathSegments[pathSegments.length - 1];

    if (!token) {
        return res.status(400).json({ success: false, error: 'Image token is missing' });
    }

    const decodedToken = decodeURIComponent(token);
    const realUrl = decryptImageUrl(decodedToken);

    if (!realUrl) {
        return res.status(400).json({ success: false, error: 'Invalid or expired image token' });
    }

    // ── STRATEGY 1: Serve from local public/ folder ────────────────
    // If the URL belongs to our frontend origin, strip the origin and
    // look for the file in the backend's own public/ directory.
    if (realUrl.startsWith(FRONTEND_ORIGIN)) {
        const relativePath = realUrl.slice(FRONTEND_ORIGIN.length); // e.g. "/rides.png"
        // Security: prevent path traversal
        const safeName = path.basename(relativePath);             // e.g. "rides.png"
        const localPath = path.join(PUBLIC_DIR, safeName);
        const ext = path.extname(safeName).toLowerCase();
        const mimeType = IMAGE_MIME[ext];

        if (mimeType && fs.existsSync(localPath)) {
            res.setHeader('Content-Type', mimeType);
            res.setHeader('Cache-Control', 'public, max-age=86400');
            return fs.createReadStream(localPath).pipe(res);
        }

        // File not found locally — log a helpful message and fall through to proxy
        console.warn(
            `[ImageProxy] Local file not found: ${localPath}\n` +
            `  → Copy your image files into: ${PUBLIC_DIR}\n` +
            `  → Falling back to HTTP proxy...`
        );
    }

    // ── STRATEGY 2: HTTP proxy (for external/CDN URLs) ─────────────
    let parsedUrl;
    try {
        parsedUrl = new URL(realUrl);
    } catch {
        return res.status(400).json({ success: false, error: 'Invalid image URL' });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return res.status(403).json({ success: false, error: 'Forbidden URL protocol' });
    }

    const transport = parsedUrl.protocol === 'https:' ? https : http;

    const proxyReq = transport.get(realUrl, (proxyRes) => {
        const contentType = proxyRes.headers['content-type'] || 'image/jpeg';

        if (!contentType.startsWith('image/') && !contentType.startsWith('video/')) {
            return res.status(403).json({ success: false, error: 'URL does not point to an image' });
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        if (proxyRes.headers['content-length']) {
            res.setHeader('Content-Length', proxyRes.headers['content-length']);
        }

        proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
        console.error('[ImageProxy] HTTP proxy error:', err.message);
        console.error(
            `  → Could not reach: ${realUrl}\n` +
            `  → Copy image files to: ${PUBLIC_DIR} to avoid network dependency.`
        );
        res.status(502).json({
            success: false,
            error: 'Could not fetch image. Place files in backend/public/ folder.',
            hint: `Copy your image files to: ${PUBLIC_DIR}`
        });
    });

    proxyReq.setTimeout(10000, () => {
        proxyReq.destroy();
        res.status(504).json({ success: false, error: 'Image fetch timed out' });
    });
};

module.exports = { serveImage };
