const Logo = require('../models/Logo');

// @desc    Get All Logos
// @route   GET /logo
// @access  Admin / BackendWorker / FrontendWorker
const getLogos = async (req, res) => {
    try {
        const data = await Logo.find();
        res.status(200).json({ success: true, count: data.length, data });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get Logo By ID
// @route   GET /logo/:id
// @access  Admin / BackendWorker / FrontendWorker
const getLogo = async (req, res) => {
    try {
        const data = await Logo.findById(req.params.id);
        if (!data) return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create Logo
// @route   GET /logo/create
// @access  Admin
const createLogo = async (req, res) => {
    try {
        const data = await Logo.create(req.body);
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update Logo
// @route   GET /logo/:id/update
// @access  Admin / BackendWorker
const updateLogo = async (req, res) => {
    try {
        const data = await Logo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!data) return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete Logo
// @route   GET /logo/:id/delete
// @access  Admin
const deleteLogo = async (req, res) => {
    try {
        const data = await Logo.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    getLogos,
    getLogo,
    createLogo,
    updateLogo,
    deleteLogo
};
