const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "anirudh",
    password: "suman1979",
    database: "tracker",
});
var otpGenerator = require('otp-generator')
const API_KEY = process.env.API_KEY;
const bcrypt = require('bcrypt');
const fast2sms = require('fast-two-sms')

const sendController = async (req, res) => {
    try {
        // var options = {authorization : API_KEY , message : `Your OTP number is ${otp}` ,  numbers : ['9910231951']} 
        // fast2sms.sendMessage(options)



        const mobile_number = req.body.mobile_number;
        const otp = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false });
        const ttl = 500000000000 * 60 * 1000;
        const expires = Date.now() + ttl;
        const data = `${mobile_number}.${otp}.${expires}`;
        // const hash = crypto.createHmac("sha256", SMS_SECRET_KEY).update(data).digest("hex");
        const hash = await bcrypt.hash(data, 10);
        const fullHash = `${hash}.${expires}`;
        
        var options = {authorization : API_KEY , message : `Use ${otp} as your verification code on Anirudh Store. The otp expires within 5 minutes. ` ,  numbers : [req.body.mobile_number]} 
        fast2sms.sendMessage(options)
        
        // res.cookie("otp_status", "checking OTP")
        // res.status(200).send({ mobile_number, otp })
        res.status(200).send({ mobile_number, hash: fullHash, otp })


    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendController }