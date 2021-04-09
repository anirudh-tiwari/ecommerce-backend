const express = require('express');
const router = express.Router();
const { registerProduct } = require("../controller/productController")
const { getProduct } = require("../controller/getProductController")
const { getProductView } = require("../controller/getProductViewController")
const { getSearchProduct } = require("../controller/getSearchProductController")

router.post("/create", registerProduct);
router.get("/get", getProduct);
router.get("/view", getProductView);
router.get("/search", getSearchProduct);


module.exports = router;