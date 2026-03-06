const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getHeroBackground,
    updateHeroBackground,
    getHeroText,
    updateHeroText,
    getQuickAccessText,
    updateQuickAccessText,
    getQuickAccessCards,
    updateQuickAccessCards,
    getQuickAccessDecorations,
    updateQuickAccessDecorations,
    getDiningBackground,
    updateDiningBackground,
    getDiningText,
    updateDiningText,
    getDiningPosters,
    updateDiningPosters,
    getSignatureText,
    updateSignatureText,
    getSignatureCategories,
    updateSignatureCategories,
    getSignatureCards,
    updateSignatureCards,
    getBookingBackground,
    updateBookingBackground,
    getBookingDecorations,
    updateBookingDecorations,
    getBookingTitle,
    updateBookingTitle,
    getBookingFormLabels,
    updateBookingFormLabels,
    getAmenitiesBackground,
    updateAmenitiesBackground,
    getAmenitiesDecorations,
    updateAmenitiesDecorations,
    getAmenitiesText,
    updateAmenitiesText,
    getAmenities,
    updateAmenities,
    getGuestReviewsBackground,
    updateGuestReviewsBackground,
    getGuestReviewsDecorations,
    updateGuestReviewsDecorations,
    getGuestReviewsText,
    updateGuestReviewsText,
    getGuestReviewsList,
    updateGuestReviewsList
} = require('../controllers/homeController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

// Hero Background
router.get('/hero/background', protect, authorize(...reader), getHeroBackground);
router.get('/hero/background/update', protect, authorize(...writer), updateHeroBackground);

// Hero Text
router.get('/hero/text', protect, authorize(...reader), getHeroText);
router.get('/hero/text/update', protect, authorize(...writer), updateHeroText);

// Quick Access Text
router.get('/quick-access/text', protect, authorize(...reader), getQuickAccessText);
router.get('/quick-access/text/update', protect, authorize(...writer), updateQuickAccessText);

// Quick Access Cards
router.get('/quick-access/cards', protect, authorize(...reader), getQuickAccessCards);
router.get('/quick-access/cards/update', protect, authorize(...writer), updateQuickAccessCards);

// Quick Access Decorations
router.get('/quick-access/decorations', protect, authorize(...reader), getQuickAccessDecorations);
router.get('/quick-access/decorations/update', protect, authorize(...writer), updateQuickAccessDecorations);

// Dining Background
router.get('/dining/background', protect, authorize(...reader), getDiningBackground);
router.get('/dining/background/update', protect, authorize(...writer), updateDiningBackground);

// Dining Text
router.get('/dining/text', protect, authorize(...reader), getDiningText);
router.get('/dining/text/update', protect, authorize(...writer), updateDiningText);

// Dining Posters
router.get('/dining/posters', protect, authorize(...reader), getDiningPosters);
router.get('/dining/posters/update', protect, authorize(...writer), updateDiningPosters);

// Signature Attractions Text
router.get('/signature-attractions/text', protect, authorize(...reader), getSignatureText);
router.get('/signature-attractions/text/update', protect, authorize(...writer), updateSignatureText);

// Signature Attractions Categories
router.get('/signature-attractions/categories', protect, authorize(...reader), getSignatureCategories);
router.get('/signature-attractions/categories/update', protect, authorize(...writer), updateSignatureCategories);

// Signature Attractions Cards
router.get('/signature-attractions/cards', protect, authorize(...reader), getSignatureCards);
router.get('/signature-attractions/cards/update', protect, authorize(...writer), updateSignatureCards);

// Booking Background
router.get('/booking/background', protect, authorize(...reader), getBookingBackground);
router.get('/booking/background/update', protect, authorize(...writer), updateBookingBackground);

// Booking Decorations
router.get('/booking/decorations', protect, authorize(...reader), getBookingDecorations);
router.get('/booking/decorations/update', protect, authorize(...writer), updateBookingDecorations);

// Booking Title
router.get('/booking/title', protect, authorize(...reader), getBookingTitle);
router.get('/booking/title/update', protect, authorize(...writer), updateBookingTitle);

// Booking Form Labels
router.get('/booking/form-labels', protect, authorize(...reader), getBookingFormLabels);
router.get('/booking/form-labels/update', protect, authorize(...writer), updateBookingFormLabels);

// Resort Amenities Background
router.get('/resort-amenities/background', protect, authorize(...reader), getAmenitiesBackground);
router.get('/resort-amenities/background/update', protect, authorize(...writer), updateAmenitiesBackground);

// Resort Amenities Decorations
router.get('/resort-amenities/decorations', protect, authorize(...reader), getAmenitiesDecorations);
router.get('/resort-amenities/decorations/update', protect, authorize(...writer), updateAmenitiesDecorations);

// Resort Amenities Text
router.get('/resort-amenities/text', protect, authorize(...reader), getAmenitiesText);
router.get('/resort-amenities/text/update', protect, authorize(...writer), updateAmenitiesText);

// Resort Amenities List
router.get('/resort-amenities/amenities', protect, authorize(...reader), getAmenities);
router.get('/resort-amenities/amenities/update', protect, authorize(...writer), updateAmenities);

// Guest Reviews Background
router.get('/guest-reviews/background', protect, authorize(...reader), getGuestReviewsBackground);
router.get('/guest-reviews/background/update', protect, authorize(...writer), updateGuestReviewsBackground);

// Guest Reviews Decorations
router.get('/guest-reviews/decorations', protect, authorize(...reader), getGuestReviewsDecorations);
router.get('/guest-reviews/decorations/update', protect, authorize(...writer), updateGuestReviewsDecorations);

// Guest Reviews Text
router.get('/guest-reviews/text', protect, authorize(...reader), getGuestReviewsText);
router.get('/guest-reviews/text/update', protect, authorize(...writer), updateGuestReviewsText);

// Guest Reviews List
router.get('/guest-reviews/reviews', protect, authorize(...reader), getGuestReviewsList);
router.get('/guest-reviews/reviews/update', protect, authorize(...writer), updateGuestReviewsList);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all (Must be last)
// Matches any path: e.g. /hero/text/title or /quick-access/cards/0/title
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
