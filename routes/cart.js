const express = require('express');
const router = express.Router();
const { createCart } = require("../controller/createCartController")
const { getCart } = require("../controller/getCartController")
const { deleteCart } = require("../controller/deleteCartController")

router.post("/create", createCart);
router.get("/get", getCart);
router.get("/delete", deleteCart);


module.exports = router;