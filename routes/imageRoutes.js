const express = require('express');
const { serveImage } = require('../controllers/imageController');

const router = express.Router();

// GET /img/.../:token — public, no auth needed (used as <img src="...">)
router.get(/.*/, serveImage);

module.exports = router;
