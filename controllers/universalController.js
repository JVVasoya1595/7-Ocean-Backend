const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encryption');

/**
 * Maps route prefixes to Mongoose Models
 */
const MODEL_MAP = {
    'home': 'Home',
    'bar': 'Bar',
    'resort': 'Resort',
    'about': 'About',
    'book': 'Book',
    'contact': 'Contact',
    'gallery': 'Gallery',
    'navbar': 'Navbar',
    'footer': 'Footer',
    'logo': 'Logo',
    'welcome-popup': 'WelcomePopup'
};

/**
 * Maps shortened route segments directly where names differ significantly
 */
const PATH_ALIASES = {
    'home': {
        'dining': 'diningAndMore'
    },
    'navbar': {
        'button': 'actionButton'
    }
};

/**
 * Finds the matching key in an object (case-insensitive fallback)
 * e.g., "pricetag" will match "priceTag", "imageurl" will match "imageUrl"
 */
const findKey = (obj, segment) => {
    if (obj == null || typeof obj !== 'object') return undefined;

    // 1. Exact match
    if (segment in obj) return segment;

    // 2. Case-insensitive match (e.g., pricetag → priceTag)
    const lower = segment.toLowerCase();
    const keys = Object.keys(obj);
    const match = keys.find(k => k.toLowerCase() === lower);
    if (match) return match;

    return undefined;
};

/**
 * Converts a URL segment to potential schema key
 * Handles: hyphenated → camelCase, explicit aliases
 */
const resolveSegment = (seg, aliases) => {
    // 1. Explicit aliases (e.g., dining → diningAndMore)
    if (aliases[seg]) return aliases[seg];

    // 2. Hyphenated → camelCase (e.g., room-categories → roomCategories)
    if (seg.includes('-')) {
        return seg.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    return seg;
};

/**
 * Smart traversal that handles:
 *   - Case-insensitive key matching (pricetag → priceTag)
 *   - Array field extraction (cards/priceTag → pluck priceTag from each card)
 *   - Numeric array indexing (cards/0 → first card)
 */
const traversePath = (obj, segments, aliases) => {
    let current = obj;

    for (let i = 0; i < segments.length; i++) {
        if (current == null) return undefined;

        const seg = resolveSegment(segments[i], aliases);

        // If current is an array
        if (Array.isArray(current)) {
            // Numeric index → access specific element
            if (/^\d+$/.test(seg)) {
                current = current[parseInt(seg, 10)];
                continue;
            }

            // Non-numeric → extract this field (and remaining path) from every element
            const remainingSegments = segments.slice(i);
            return current.map(item => {
                const result = traversePath(
                    typeof item === 'object' && item !== null && item.toObject ? item.toObject() : item,
                    remainingSegments,
                    aliases
                );
                return result;
            });
        }

        // Convert Mongoose subdoc to plain object for key lookup
        const plain = typeof current === 'object' && current.toObject ? current.toObject() : current;

        // Find the actual key (with case-insensitive fallback)
        const actualKey = findKey(plain, seg);
        if (actualKey === undefined) return undefined;

        // Use the actual key to get the value from the original (Mongoose) object
        if (typeof current === 'object' && current.get) {
            current = current.get(actualKey);
        } else {
            current = current[actualKey];
        }
    }

    return current;
};

// @desc    Generic Get Data By Path
// @access  Protected (Reader)
const getDataByPath = async (req, res) => {
    try {
        const modulePrefix = req.baseUrl.replace(/^\//, '');
        const modelName = MODEL_MAP[modulePrefix];

        if (!modelName) {
            return res.status(404).json({ success: false, error: 'Module not found' });
        }

        const Model = mongoose.model(modelName);
        const doc = await Model.findOne();

        if (!doc) {
            return res.status(404).json({ success: false, error: 'Document not found' });
        }

        // Extract path from wildcard
        const rawPath = req.params[0].replace(/^\/|\/$/g, '');
        if (!rawPath) {
            const encryptedToken = encrypt(doc.toObject());
            return res.status(200).json({ success: true, encryptedToken });
        }

        const segments = rawPath.split('/').filter(Boolean);
        const aliases = PATH_ALIASES[modulePrefix] || {};
        const data = traversePath(doc, segments, aliases);

        if (data === undefined) {
            return res.status(404).json({ success: false, error: `Path '${rawPath}' not found in ${modelName}` });
        }

        // Convert Mongoose docs/subdocs to plain objects for encryption
        const plainData = (typeof data === 'object' && data !== null && data.toObject)
            ? data.toObject()
            : data;

        const encryptedToken = encrypt(plainData);
        res.status(200).json({ success: true, encryptedToken });
    } catch (error) {
        console.error(`[UniversalController] Error:`, error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Generic Update Data By Path
// @access  Protected (Writer)
const updateDataByPath = async (req, res) => {
    try {
        const modulePrefix = req.baseUrl.replace(/^\//, '');
        const modelName = MODEL_MAP[modulePrefix];

        if (!modelName) {
            return res.status(404).json({ success: false, error: 'Module not found' });
        }

        if (!req.body.encryptedToken) {
            return res.status(400).json({ success: false, error: 'Encrypted token required' });
        }

        const Model = mongoose.model(modelName);
        let doc = await Model.findOne();
        if (!doc) doc = new Model();

        const rawPath = req.params[0].replace(/\/update$/, '').replace(/^\/|\/$/g, '');
        const segments = rawPath.split('/').filter(Boolean);
        const aliases = PATH_ALIASES[modulePrefix] || {};

        // Resolve each segment to a Mongoose dot-notation path
        const resolvedPath = segments.map(seg => resolveSegment(seg, aliases)).join('.');

        const decryptedData = decrypt(req.body.encryptedToken);

        if (!resolvedPath) {
            Object.assign(doc, decryptedData);
        } else {
            doc.set(resolvedPath, decryptedData);
        }

        await doc.save();

        const encryptedToken = encrypt(decryptedData);
        res.status(200).json({ success: true, encryptedToken });
    } catch (error) {
        console.error(`[UniversalController] Error:`, error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = { getDataByPath, updateDataByPath };
