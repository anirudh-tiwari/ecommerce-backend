const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "ani",
    password: "suman1979",
    database: "ecommerce",
});

const
productRedux = (req, res) => {
        try {
            let queryParameter = req.query.ID;
            let sql = ` select c.QUANTITY,p.ID,p.IMAGE,p.DISCOUNT_PRICE as actualPrice,p.NAME,p.ORIGINAL_PRICE,p.DISCOUNT_PRICE from Cart c,Product p WHERE p.ID=${queryParameter} and c.PRODUCT_ID=${queryParameter} and USER_ID=${req.user.user_id} `;
	        let query = conn.query(sql, (err, result) => {
		     if (err) throw err;
		    res.send(result);
	});
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, error: err });
        }
    }

module.exports = { productRedux }  