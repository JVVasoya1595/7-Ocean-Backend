const express = require('express');
const { getToken } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /auth/token?role=Admin&id=myuser (PROTECTED - requires valid JWT)
router.get('/token', getToken);

module.exports = router;
