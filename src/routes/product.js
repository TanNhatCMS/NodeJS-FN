const router = require('express').Router();
const { getAllProductsAPI } = require('../controllers/productController');

router.get("/", getAllProductsAPI);

module.exports = router;
