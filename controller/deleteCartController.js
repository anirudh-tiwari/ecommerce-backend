const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "ani",
    password: "suman1979",
    database: "ecommerce",
});

const
 deleteCart = (req, res) => {
        try {
            let sql = `DELETE FROM Cart WHERE PRODUCT_ID=${req.body.PRODUCT_ID} AND USER_ID=${req.user.user_id}`;
	        let query = conn.query(sql, (err, result) => {
	        	if (err) throw err;
		        res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	        });
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, error: err });
        }
    }

module.exports = { deleteCart }           