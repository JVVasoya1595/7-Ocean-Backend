const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getAboutHeroBackground,
    updateAboutHeroBackground,
    getAboutHeroInfoBox,
    updateAboutHeroInfoBox,
    getAboutOurStory,
    updateAboutOurStory,
    getAboutOurPurpose,
    updateAboutOurPurpose,
    getAboutOurValues,
    updateAboutOurValues,
    getAboutExcellence,
    updateAboutExcellence
} = require('../controllers/aboutController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

router.get('/hero/background', protect, authorize(...reader), getAboutHeroBackground);
router.get('/hero/background/update', protect, authorize(...writer), updateAboutHeroBackground);

router.get('/hero/infobox', protect, authorize(...reader), getAboutHeroInfoBox);
router.get('/hero/infobox/update', protect, authorize(...writer), updateAboutHeroInfoBox);

router.get('/our-story', protect, authorize(...reader), getAboutOurStory);
router.get('/our-story/update', protect, authorize(...writer), updateAboutOurStory);

router.get('/our-purpose', protect, authorize(...reader), getAboutOurPurpose);
router.get('/our-purpose/update', protect, authorize(...writer), updateAboutOurPurpose);

router.get('/our-values', protect, authorize(...reader), getAboutOurValues);
router.get('/our-values/update', protect, authorize(...writer), updateAboutOurValues);

router.get('/excellence', protect, authorize(...reader), getAboutExcellence);
router.get('/excellence/update', protect, authorize(...writer), updateAboutExcellence);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
