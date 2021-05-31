const express = require('express');
const router = express.Router();
const { registerProduct } = require("../controller/productController")
const { getProduct } = require("../controller/getProductController")
const { getProductView } = require("../controller/getProductViewController")
const { getSearchProduct } = require("../controller/getSearchProductController")
const { productRedux } = require("../controller/productRedux")
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

router.post("/create", registerProduct);
router.get("/get",auth, getProduct);
router.get("/redux",auth, productRedux);
router.get("/view", getProductView);
router.get("/search", getSearchProduct);


module.exports = router;