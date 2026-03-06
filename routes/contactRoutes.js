const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getContactHeroBackground,
    updateContactHeroBackground,
    getContactHeroInfoBox,
    updateContactHeroInfoBox,
    getContactGetInTouch,
    updateContactGetInTouch,
    getContactReachUs,
    updateContactReachUs,
    getContactNeedToKnow,
    updateContactNeedToKnow
} = require('../controllers/contactController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

router.get('/hero/background', protect, authorize(...reader), getContactHeroBackground);
router.get('/hero/background/update', protect, authorize(...writer), updateContactHeroBackground);

router.get('/hero/infobox', protect, authorize(...reader), getContactHeroInfoBox);
router.get('/hero/infobox/update', protect, authorize(...writer), updateContactHeroInfoBox);

router.get('/get-in-touch', protect, authorize(...reader), getContactGetInTouch);
router.get('/get-in-touch/update', protect, authorize(...writer), updateContactGetInTouch);

router.get('/reach-us', protect, authorize(...reader), getContactReachUs);
router.get('/reach-us/update', protect, authorize(...writer), updateContactReachUs);

router.get('/need-to-know', protect, authorize(...reader), getContactNeedToKnow);
router.get('/need-to-know/update', protect, authorize(...writer), updateContactNeedToKnow);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
