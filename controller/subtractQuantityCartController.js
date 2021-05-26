const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "ani",
    password: "suman1979",
    database: "ecommerce",
});

const
subtractQuantityCart = (req, res) => {
        try {
            let sql = `update Cart set QUANTITY=${req.body.QUANTITY-1} where PRODUCT_ID=${req.body.PRODUCT_ID} and USER_ID=${req.user.user_id}`;
            let query = conn.query(sql, (err, result) => {
                if (err) throw err;
                return res.json({ status: 200, error: null, response: "New Record is Added successfully" });
            });
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, error: err });
        }
    }

module.exports = { subtractQuantityCart }   