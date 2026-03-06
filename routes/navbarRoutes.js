const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getNavbarLogo,
    updateNavbarLogo,
    getNavbarLinks,
    updateNavbarLinks,
    getNavbarBackground,
    updateNavbarBackground,
    getNavbarButton,
    updateNavbarButton
} = require('../controllers/navbarController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

router.get('/background', protect, authorize(...reader), getNavbarBackground);
router.get('/background/update', protect, authorize(...writer), updateNavbarBackground);

router.get('/logo', protect, authorize(...reader), getNavbarLogo);
router.get('/logo/update', protect, authorize(...writer), updateNavbarLogo);

router.get('/links', protect, authorize(...reader), getNavbarLinks);
router.get('/links/update', protect, authorize(...writer), updateNavbarLinks);

router.get('/button', protect, authorize(...reader), getNavbarButton);
router.get('/button/update', protect, authorize(...writer), updateNavbarButton);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
