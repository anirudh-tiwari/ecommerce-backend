const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "ani",
    password: "suman1979",
    database: "ecommerce",
});

const
    createCart = (req, res) => {
        try {
            let data = { QUANTITY: req.body.QUANTITY, PRODUCT_ID: req.body.PRODUCT_ID, USER_ID: req.user.user_id };
            let sql = "INSERT INTO Cart SET ?";
            let query = conn.query(sql, data, (err, result) => {
                if (err) throw err;
                return res.json({ status: 200, error: null, response: "New Record is Added successfully" });
            });
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, error: err });
        }
    }

module.exports = { createCart }
