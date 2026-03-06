const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getFooterLogo,
    updateFooterLogo,
    getFooterLinks,
    updateFooterLinks,
    getFooterContact,
    updateFooterContact,
    getFooterCopyright,
    updateFooterCopyright
} = require('../controllers/footerController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

router.get('/logo', protect, authorize(...reader), getFooterLogo);
router.get('/logo/update', protect, authorize(...writer), updateFooterLogo);

router.get('/links', protect, authorize(...reader), getFooterLinks);
router.get('/links/update', protect, authorize(...writer), updateFooterLinks);

router.get('/contact', protect, authorize(...reader), getFooterContact);
router.get('/contact/update', protect, authorize(...writer), updateFooterContact);

router.get('/copyright', protect, authorize(...reader), getFooterCopyright);
router.get('/copyright/update', protect, authorize(...writer), updateFooterCopyright);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
