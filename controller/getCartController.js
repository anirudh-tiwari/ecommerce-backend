const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "ani",
    password: "suman1979",
    database: "ecommerce",
});

const
    getCart = (req, res) => {
        try {
            let sql = ` select c.QUANTITY,p.ID,p.IMAGE,p.ORIGINAL_PRICE as actualPrice,p.NAME,p.ORIGINAL_PRICE,p.DISCOUNT_PRICE from Cart c, Product p where c.PRODUCT_ID=p.ID and USER_ID=${req.user.user_id} `;
	        let query = conn.query(sql, (err, result) => {
		     if (err) throw err;
		    res.send(result);
	});
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, error: err });
        }
    }

module.exports = { getCart }  