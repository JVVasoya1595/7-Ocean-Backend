const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getBookHeroBackground,
    updateBookHeroBackground,
    getBookHeroTextContent,
    updateBookHeroTextContent,
    getBookHeroInfoBox,
    updateBookHeroInfoBox,
    getBookExperiences,
    updateBookExperiences,
    getBookBookingFlow,
    updateBookBookingFlow
} = require('../controllers/bookController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

router.get('/hero/background', protect, authorize(...reader), getBookHeroBackground);
router.get('/hero/background/update', protect, authorize(...writer), updateBookHeroBackground);

router.get('/hero/text-content', protect, authorize(...reader), getBookHeroTextContent);
router.get('/hero/text-content/update', protect, authorize(...writer), updateBookHeroTextContent);

router.get('/hero/infobox', protect, authorize(...reader), getBookHeroInfoBox);
router.get('/hero/infobox/update', protect, authorize(...writer), updateBookHeroInfoBox);

router.get('/experiences', protect, authorize(...reader), getBookExperiences);
router.get('/experiences/update', protect, authorize(...writer), updateBookExperiences);

router.get('/booking-flow', protect, authorize(...reader), getBookBookingFlow);
router.get('/booking-flow/update', protect, authorize(...writer), updateBookBookingFlow);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
