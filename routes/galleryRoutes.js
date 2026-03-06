const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getGalleryHeroBackground,
    updateGalleryHeroBackground,
    getGalleryHeroInfoBox,
    updateGalleryHeroInfoBox,
    getGalleryGridSection,
    updateGalleryGridSection
} = require('../controllers/galleryController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

router.get('/hero/background', protect, authorize(...reader), getGalleryHeroBackground);
router.get('/hero/background/update', protect, authorize(...writer), updateGalleryHeroBackground);

router.get('/hero/infobox', protect, authorize(...reader), getGalleryHeroInfoBox);
router.get('/hero/infobox/update', protect, authorize(...writer), updateGalleryHeroInfoBox);

router.get('/grid-section', protect, authorize(...reader), getGalleryGridSection);
router.get('/grid-section/update', protect, authorize(...writer), updateGalleryGridSection);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
