const Footer = require('../models/Footer');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create Footer document
const getOrCreateFooterDoc = async () => {
    let footer = await Footer.findOne();
    if (!footer) {
        footer = await Footer.create({
            links: [
                { label: 'Rides', url: '/rides' },
                { label: 'Experience', url: '/experience' },
                { label: 'Resort', url: '/resort' },
                { label: 'Book', url: '/book' },
                { label: 'Gallery', url: '/gallery' }
            ]
        });
    }
    return footer;
};


// @desc    Get Footer Logo
// @route   GET /footer/logo
// @access  Admin / BackendWorker / FrontendWorker
exports.getFooterLogo = async (req, res) => {
    try {
        const footer = await getOrCreateFooterDoc();
        const encryptedData = encrypt({ logo: footer.logo });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Footer Logo
// @route   GET /footer/logo/update
// @access  Admin / BackendWorker
exports.updateFooterLogo = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { logo } = decryptedData;

        const footer = await getOrCreateFooterDoc();
        if (logo) {
            if (logo.imageUrl) footer.logo.imageUrl = logo.imageUrl;
            if (logo.altText) footer.logo.altText = logo.altText;
        }
        await footer.save();

        const encryptedResponse = encrypt({ logo: footer.logo });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Footer Links
// @route   GET /footer/links
// @access  Admin / BackendWorker / FrontendWorker
exports.getFooterLinks = async (req, res) => {
    try {
        const footer = await getOrCreateFooterDoc();
        const encryptedData = encrypt({ links: footer.links });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Footer Links
// @route   GET /footer/links/update
// @access  Admin / BackendWorker
exports.updateFooterLinks = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { links } = decryptedData;

        const footer = await getOrCreateFooterDoc();
        if (links) footer.links = links;
        await footer.save();

        const encryptedResponse = encrypt({ links: footer.links });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Footer Contact Info
// @route   GET /footer/contact
// @access  Admin / BackendWorker / FrontendWorker
exports.getFooterContact = async (req, res) => {
    try {
        const footer = await getOrCreateFooterDoc();
        const encryptedData = encrypt({ contactInfo: footer.contactInfo });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Footer Contact Info
// @route   GET /footer/contact/update
// @access  Admin / BackendWorker
exports.updateFooterContact = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { contactInfo } = decryptedData;

        const footer = await getOrCreateFooterDoc();
        if (contactInfo) Object.assign(footer.contactInfo, contactInfo);
        await footer.save();

        const encryptedResponse = encrypt({ contactInfo: footer.contactInfo });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Footer Copyright
// @route   GET /footer/copyright
// @access  Admin / BackendWorker / FrontendWorker
exports.getFooterCopyright = async (req, res) => {
    try {
        const footer = await getOrCreateFooterDoc();
        const encryptedData = encrypt({ copyright: footer.copyright });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Footer Copyright
// @route   GET /footer/copyright/update
// @access  Admin / BackendWorker
exports.updateFooterCopyright = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { copyright } = decryptedData;

        const footer = await getOrCreateFooterDoc();
        if (copyright) Object.assign(footer.copyright, copyright);
        await footer.save();

        const encryptedResponse = encrypt({ copyright: footer.copyright });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
