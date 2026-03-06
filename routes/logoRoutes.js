const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
    getLogos,
    getLogo,
    createLogo,
    updateLogo,
    deleteLogo
} = require('../controllers/logoController');

const router = express.Router();

// GET /logo                → list logos (FrontendWorker+)
// GET /logo/create         → create logo (Admin)
// GET /logo/:id            → get single logo (FrontendWorker+)
// GET /logo/:id/update     → update logo (Admin / BackendWorker)
// GET /logo/:id/delete     → delete logo (Admin)

router.get('/', protect, authorize('Admin', 'BackendWorker', 'FrontendWorker'), getLogos);
router.get('/create', protect, authorize('Admin'), createLogo);
router.get('/:id', protect, authorize('Admin', 'BackendWorker', 'FrontendWorker'), getLogo);
router.get('/:id/update', protect, authorize('Admin', 'BackendWorker'), updateLogo);
router.get('/:id/delete', protect, authorize('Admin'), deleteLogo);

const { getDataByPath, updateDataByPath } = require('../controllers/universalController');

// Hierarchical Catch-all
router.get(/(.*)\/update$/, protect, authorize('Admin', 'BackendWorker'), updateDataByPath);
router.get(/(.*)/, protect, authorize('Admin', 'BackendWorker', 'FrontendWorker'), getDataByPath);

module.exports = router;
