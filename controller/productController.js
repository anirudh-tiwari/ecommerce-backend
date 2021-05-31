const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "ani",
    password: "suman1979",
    database: "ecommerce",
});

const
    registerProduct = (req, res) => {
        try {
            let data = { IMAGE: req.body.IMAGE, NAME: req.body.NAME, ORIGINAL_PRICE: req.body.ORIGINAL_PRICE, DISCOUNT_PRICE: req.body.DISCOUNT_PRICE, DESCRIPTION : req.body.DESCRIPTION };
            let sql = "INSERT INTO Product SET ?";
            let query = conn.query(sql, data, (err, result) => {
                console.log(result)
                if (err) throw err;
                return res.json({ status: 200, error: null, response: "New Record is Added successfully" });
            });
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, error: err });
        }
    }

module.exports = { registerProduct }