const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "ani",
  password: "suman1979",
  database: "ecommerce",
});
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

const verifyController = async (req, res) => {
  const mobile_number = req.body.mobile_number;
  const hash = req.body.hash;
  const otp = req.body.otp;
  let hashSplit = hash.split(".");
  let expires = hashSplit.pop();
  let hashValue = hashSplit.join(".");
  let now = Date.now();
  if (now > parseInt(expires)) {
    return res.status(504).send({ msg: "Timeout Pls Try Again" });
  }
  let data = `${mobile_number}.${otp}.${expires}`;
  let hashCompare = await bcrypt.compare(data, hashValue);
  // let id =
  if (hashCompare) {
    let mobileValueSql = `select ID from User where MOBILE_NUMBER=${mobile_number}`;
    let query = conn.query(mobileValueSql, (err, result) => {
      if (err) throw err;
      if (!result.length) {
        let data = { MOBILE_NUMBER: mobile_number };
        let sql = "INSERT INTO User SET ?";
        let query = conn.query(sql, data, (err, result) => {
          if (err) throw err;
        });
      }
      let id = `select ID from User where MOBILE_NUMBER=${mobile_number}`;
      let query2 = conn.query(id, (err, result) => {
        if (err) throw err;
        // return res.json(result);
        const accessToken = jwt.sign(
          { mobile_number, user_id: result[0].ID },
          JWT_AUTH_TOKEN
        );
        const refreshToken = jwt.sign(mobile_number, JWT_REFRESH_TOKEN);
        res
          .status(202)
          .send({
            verification: true,
            msg: "Correct OTP",
            accessToken,
            refreshToken,
          });
      });
    });
  } else {
    return res.status(400).send({ verification: false, msg: "Incorrect OTP" });
  }
};

module.exports = { verifyController };
