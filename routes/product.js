const express = require('express');
const router = express.Router();
const { registerProduct } = require("../controller/productController")
const { getProduct } = require("../controller/getProductController")

router.post("/create", registerProduct);
router.get("/get", getProduct);

module.exports = router;