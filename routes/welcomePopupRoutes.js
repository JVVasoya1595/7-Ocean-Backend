const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getWelcomePopup,
    updateWelcomePopup
} = require('../controllers/welcomePopupController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

router.get('/', protect, authorize(...reader), getWelcomePopup);
router.get('/update', protect, authorize(...writer), updateWelcomePopup);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
