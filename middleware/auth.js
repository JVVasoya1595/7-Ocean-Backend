const jwt = require('jsonwebtoken');

/**
 * Verifies the JWT token from the Authorization header.
 * Attaches decoded user payload to req.user.
 */
const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role, iat, exp }
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Not authorized. Token is invalid or expired.' });
    }
};

/**
 * Role-based access control middleware factory.
 * Usage: authorize('Admin', 'BackendWorker')
 * Roles: 'Admin' | 'BackendWorker' | 'FrontendWorker'
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `Role '${req.user?.role}' is not authorized to access this route.`
            });
        }
        next();
    };
};

/**
 * Helper: generate a JWT token for a user.
 * Usage in login/seed routes: generateToken({ id, role })
 */
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

module.exports = { protect, authorize, generateToken };
