const Navbar = require('../models/Navbar');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create Navbar document
const getOrCreateNavbarDoc = async () => {
    let navbar = await Navbar.findOne();
    if (!navbar) {
        navbar = await Navbar.create({
            links: [
                { label: 'HORECA', url: '/horeca', hasDropdown: true, iconUrl: '/horeca-icon.png' },
                { label: 'BOOK', url: '/book', iconUrl: '/book-icon.png' },
                { label: 'ABOUT', url: '/about', iconUrl: '/about-icon.png' },
                { label: 'CONTACT', url: '/contact', iconUrl: '/contact-icon.png' },
                { label: 'GALLERY', url: '/gallery', iconUrl: '/gallery-icon.png' }
            ]
        });
    }
    return navbar;
};


// @desc    Get Navbar Logo
// @route   GET /navbar/logo
// @access  Admin / BackendWorker / FrontendWorker
exports.getNavbarLogo = async (req, res) => {
    try {
        const navbar = await getOrCreateNavbarDoc();
        const encryptedData = encrypt({ logo: navbar.logo });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Navbar Logo
// @route   GET /navbar/logo/update
// @access  Admin / BackendWorker
exports.updateNavbarLogo = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { logo } = decryptedData;

        const navbar = await getOrCreateNavbarDoc();
        if (logo) {
            if (logo.imageUrl) navbar.logo.imageUrl = logo.imageUrl;
            if (logo.altText) navbar.logo.altText = logo.altText;
        }
        await navbar.save();

        const encryptedResponse = encrypt({ logo: navbar.logo });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Navbar Links
// @route   GET /navbar/links
// @access  Admin / BackendWorker / FrontendWorker
exports.getNavbarLinks = async (req, res) => {
    try {
        const navbar = await getOrCreateNavbarDoc();
        const encryptedData = encrypt({ links: navbar.links });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Navbar Links
// @route   GET /navbar/links/update
// @access  Admin / BackendWorker
exports.updateNavbarLinks = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { links } = decryptedData;

        const navbar = await getOrCreateNavbarDoc();
        if (links) navbar.links = links;
        await navbar.save();

        const encryptedResponse = encrypt({ links: navbar.links });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Navbar Background
// @route   GET /navbar/background
// @access  Admin / BackendWorker / FrontendWorker
exports.getNavbarBackground = async (req, res) => {
    try {
        const navbar = await getOrCreateNavbarDoc();
        const encryptedData = encrypt({ background: navbar.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Navbar Background
// @route   GET /navbar/background/update
// @access  Admin / BackendWorker
exports.updateNavbarBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;

        const navbar = await getOrCreateNavbarDoc();
        if (background) Object.assign(navbar.background, background);
        await navbar.save();

        const encryptedResponse = encrypt({ background: navbar.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Navbar Action Button
// @route   GET /navbar/button
// @access  Admin / BackendWorker / FrontendWorker
exports.getNavbarButton = async (req, res) => {
    try {
        const navbar = await getOrCreateNavbarDoc();
        const encryptedData = encrypt({ actionButton: navbar.actionButton });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Navbar Action Button
// @route   GET /navbar/button/update
// @access  Admin / BackendWorker
exports.updateNavbarButton = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { actionButton } = decryptedData;

        const navbar = await getOrCreateNavbarDoc();
        if (actionButton) {
            if (actionButton.label) navbar.actionButton.label = actionButton.label;
            if (actionButton.url) navbar.actionButton.url = actionButton.url;
        }
        await navbar.save();

        const encryptedResponse = encrypt({ actionButton: navbar.actionButton });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
