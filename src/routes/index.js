const router = require('express').Router();
// static page routes
const staticRoutes = require('./static');
const productsRoutes = require('./product');
// static resource routes
const adminRouter = require("./admin");
const testRoutes = require('./test');
const scrapeRoutes = require('./scrape')
// no-dynamic-routes
router.use('/', staticRoutes);
// dynamic resource routes
router.use('/test', testRoutes);
router.use('/admin', adminRouter);
// dynamic resource routes
router.use(['/api/products', '/api/product'], productsRoutes);
router.use('/api/scrape',scrapeRoutes);
module.exports = router;
