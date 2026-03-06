const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getResortHeroBackground,
    updateResortHeroBackground,
    getResortHeroInfoBox,
    updateResortHeroInfoBox,
    getResortIntroduction,
    updateResortIntroduction,
    getResortBookingForm,
    updateResortBookingForm,
    getResortStayAndRechargeText,
    updateResortStayAndRechargeText,
    getResortStayAndRechargeImage,
    updateResortStayAndRechargeImage,
    getResortStayAndRechargeTags,
    updateResortStayAndRechargeTags,
    getResortStayAndRechargeCards,
    updateResortStayAndRechargeCards,
    getResortRoomCategoriesBanner,
    updateResortRoomCategoriesBanner,
    getResortRoomCategoriesOptions,
    updateResortRoomCategoriesOptions,
    getResortTestimonials,
    updateResortTestimonials
} = require('../controllers/resortController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

router.get('/hero/background', protect, authorize(...reader), getResortHeroBackground);
router.get('/hero/background/update', protect, authorize(...writer), updateResortHeroBackground);

router.get('/hero/infobox', protect, authorize(...reader), getResortHeroInfoBox);
router.get('/hero/infobox/update', protect, authorize(...writer), updateResortHeroInfoBox);

router.get('/introduction', protect, authorize(...reader), getResortIntroduction);
router.get('/introduction/update', protect, authorize(...writer), updateResortIntroduction);

router.get('/booking-form', protect, authorize(...reader), getResortBookingForm);
router.get('/booking-form/update', protect, authorize(...writer), updateResortBookingForm);

router.get('/stay-and-recharge/text', protect, authorize(...reader), getResortStayAndRechargeText);
router.get('/stay-and-recharge/text/update', protect, authorize(...writer), updateResortStayAndRechargeText);

router.get('/stay-and-recharge/image', protect, authorize(...reader), getResortStayAndRechargeImage);
router.get('/stay-and-recharge/image/update', protect, authorize(...writer), updateResortStayAndRechargeImage);

router.get('/stay-and-recharge/tags', protect, authorize(...reader), getResortStayAndRechargeTags);
router.get('/stay-and-recharge/tags/update', protect, authorize(...writer), updateResortStayAndRechargeTags);

router.get('/stay-and-recharge/cards', protect, authorize(...reader), getResortStayAndRechargeCards);
router.get('/stay-and-recharge/cards/update', protect, authorize(...writer), updateResortStayAndRechargeCards);

router.get('/room-categories/banner', protect, authorize(...reader), getResortRoomCategoriesBanner);
router.get('/room-categories/banner/update', protect, authorize(...writer), updateResortRoomCategoriesBanner);

router.get('/room-categories/options', protect, authorize(...reader), getResortRoomCategoriesOptions);
router.get('/room-categories/options/update', protect, authorize(...writer), updateResortRoomCategoriesOptions);

router.get('/testimonials', protect, authorize(...reader), getResortTestimonials);
router.get('/testimonials/update', protect, authorize(...writer), updateResortTestimonials);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
