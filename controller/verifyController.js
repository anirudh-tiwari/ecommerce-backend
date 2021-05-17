const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "anirudh",
    password: "suman1979",
    database: "tracker",
});
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;



const verifyController = async (req, res) => {
    const mobile_number = req.body.mobile_number;
    const hash = req.body.hash;
    const otp = req.body.otp;
    let hashSplit = hash.split(".");
    let expires = hashSplit.pop();
    let hashValue = hashSplit.join(".");
    let now = Date.now();
    if (now > parseInt(expires)) {
        return res.status(504).send({ msg: "Timeout Pls Try Again" })
    }
    let data = `${mobile_number}.${otp}.${expires}`;
    let hashCompare = await bcrypt.compare(data,hashValue) ;
    if(hashCompare){
        return  res.status(202).send({ verification: true, msg: "Correct OTP" })
    }else{
        return res.status(400).send({ verification: false, msg: "Incorrect OTP" })
    }

    // if(hashCompare){
    //     const accessToken = jwt.sign(mobile_number, JWT_AUTH_TOKEN);
    //     const refreshToken = jwt.sign(mobile_number, JWT_REFRESH_TOKEN);
    //     res.status(202).cookie("accessToken", accessToken, { httpOnly: true }).cookie("refreshToken", refreshToken, { httpOnly: true }).send({ msg: "User Confirmed" })
    //   }  else {
    //             return res.status(400).send({ verification: false, msg: "Incorrect OTP" })
    //         }
}

module.exports = { verifyController }