const express = require('express');
const router = express.Router();
const { createCart } = require("../controller/createCartController")
const { getCart } = require("../controller/getCartController")
const { deleteCart } = require("../controller/deleteCartController")
const { emptyCart } = require("../controller/emptyCart")
const { QuantityCart } = require("../controller/quantityController")
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const jwt_decode = require('jwt-decode');

const auth =  (req, res , next) => {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]

    if (!accessToken){
        return res.status(403).send("Invalid credentials")
    }

    let payload
    try{
        payload = jwt.verify(accessToken, JWT_AUTH_TOKEN , (err,user)=>{
            if (err) return res.sendStatus(403)
            let decoded = jwt_decode(accessToken);
            req.user = decoded
        })
        next()
    }
    catch(e){
        return res.status(401).send("You need login to access this page")
    }
}

router.post("/create", auth , createCart);
router.get("/get",auth , getCart);
router.delete("/delete", auth , deleteCart);
router.delete("/empty", auth , emptyCart);
router.post("/Quantity", auth , QuantityCart);


module.exports = router;