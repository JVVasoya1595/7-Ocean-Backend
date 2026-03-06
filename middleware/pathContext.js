const { AsyncLocalStorage } = require('async_hooks');

const pathStorage = new AsyncLocalStorage();

const pathContextMiddleware = (req, res, next) => {
    // Get path hierarchy (e.g. /home/hero/background -> home/hero/background)
    const pathPrefix = req.path.replace(/^\/|\/$/g, '');
    pathStorage.run(pathPrefix, () => {
        next();
    });
};

module.exports = { pathContextMiddleware, pathStorage };
