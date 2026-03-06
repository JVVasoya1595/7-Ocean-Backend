const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getBarHeroBackground,
    updateBarHeroBackground,
    getBarHeroInfoBox,
    updateBarHeroInfoBox,
    getBarIntroduction,
    updateBarIntroduction,
    getBarDrinksAndViewsText,
    updateBarDrinksAndViewsText,
    getBarDrinksAndViewsTags,
    updateBarDrinksAndViewsTags,
    getBarDrinksAndViewsCards,
    updateBarDrinksAndViewsCards,
    getBarDiscoverCocktailsText,
    updateBarDiscoverCocktailsText,
    getBarDiscoverCocktailsVideos,
    updateBarDiscoverCocktailsVideos,
    getBarPerfectDrinkText,
    updateBarPerfectDrinkText,
    getBarPerfectDrinkImages,
    updateBarPerfectDrinkImages,
    getBarReservations,
    updateBarReservations
} = require('../controllers/barController');

const router = express.Router();

const reader = ['Admin', 'BackendWorker', 'FrontendWorker'];
const writer = ['Admin', 'BackendWorker'];

router.get('/hero/background', protect, authorize(...reader), getBarHeroBackground);
router.get('/hero/background/update', protect, authorize(...writer), updateBarHeroBackground);

router.get('/hero/infobox', protect, authorize(...reader), getBarHeroInfoBox);
router.get('/hero/infobox/update', protect, authorize(...writer), updateBarHeroInfoBox);

router.get('/introduction', protect, authorize(...reader), getBarIntroduction);
router.get('/introduction/update', protect, authorize(...writer), updateBarIntroduction);

router.get('/drinks-and-views/text', protect, authorize(...reader), getBarDrinksAndViewsText);
router.get('/drinks-and-views/text/update', protect, authorize(...writer), updateBarDrinksAndViewsText);

router.get('/drinks-and-views/tags', protect, authorize(...reader), getBarDrinksAndViewsTags);
router.get('/drinks-and-views/tags/update', protect, authorize(...writer), updateBarDrinksAndViewsTags);

router.get('/drinks-and-views/cards', protect, authorize(...reader), getBarDrinksAndViewsCards);
router.get('/drinks-and-views/cards/update', protect, authorize(...writer), updateBarDrinksAndViewsCards);

router.get('/discover-cocktails/text', protect, authorize(...reader), getBarDiscoverCocktailsText);
router.get('/discover-cocktails/text/update', protect, authorize(...writer), updateBarDiscoverCocktailsText);

router.get('/discover-cocktails/videos', protect, authorize(...reader), getBarDiscoverCocktailsVideos);
router.get('/discover-cocktails/videos/update', protect, authorize(...writer), updateBarDiscoverCocktailsVideos);

router.get('/perfect-drink/text', protect, authorize(...reader), getBarPerfectDrinkText);
router.get('/perfect-drink/text/update', protect, authorize(...writer), updateBarPerfectDrinkText);

router.get('/perfect-drink/images', protect, authorize(...reader), getBarPerfectDrinkImages);
router.get('/perfect-drink/images/update', protect, authorize(...writer), updateBarPerfectDrinkImages);

router.get('/reservations', protect, authorize(...reader), getBarReservations);
router.get('/reservations/update', protect, authorize(...writer), updateBarReservations);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize(...writer), updateDataByPath);
router.get(/(.*)/, protect, authorize(...reader), getDataByPath);

module.exports = router;
