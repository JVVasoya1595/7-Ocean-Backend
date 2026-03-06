const { generateToken } = require('../middleware/auth');

/**
 * @desc    Issue a JWT token for internal/admin use
 * @route   GET /auth/token
 * @access  Admin only (protected endpoint)
 *
 * Query params:
 *   role  — 'Admin' | 'BackendWorker' | 'FrontendWorker' (must be authenticated first)
 *   id    — any identifier string (e.g. username)
 *
 * SECURITY: This endpoint requires a valid JWT token in the Authorization header.
 * Public access is blocked to prevent privilege escalation attacks.
 *
 * Example: GET /auth/token?role=BackendWorker&id=myuser
 * Header: Authorization: Bearer <existing_admin_token>
 */
const getToken = (req, res, next) => {
    try {
        const { role, id } = req.query;

        // Ensure user is authenticated (req.user is set by protect middleware)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required. Provide a valid JWT token in Authorization header.'
            });
        }

        // Only Admin can issue tokens
        if (req.user.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                error: 'Only Admin users can issue tokens.'
            });
        }

        const validRoles = ['Admin', 'BackendWorker', 'FrontendWorker'];
        if (!role || !validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                error: `'role' query param is required. Valid values: ${validRoles.join(', ')}`
            });
        }

        const token = generateToken({ id: id || 'anonymous', role });
        res.status(200).json({
            success: true,
            token,
            role,
            expiresIn: process.env.JWT_EXPIRE || '7d',
            usage: 'Set header: Authorization: Bearer <token>'
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getToken };
