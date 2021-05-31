const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "ani",
    password: "suman1979",
    database: "ecommerce",
});

const
getProduct = (req, res) => {
        try {
            // let sql="select ID,IMAGE,NAME,ORIGINAL_PRICE,DISCOUNT_PRICE,DESCRIPTION,DISCOUNT_PRICE as actualPrice from Product"
            let sql="select * from Product"
            let query = conn.query(sql, (err, result) => {
                if (err) throw err;
                return res.json(result);
            });
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, error: err });
        }
    }

module.exports = { getProduct }