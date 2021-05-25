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
            let sql = `SELECT * FROM Cart WHERE USER_ID=${req.user.USER_ID}`;
	        let query = conn.query(sql, (err, result) => {
		     if (err) throw err;
		    res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, error: err });
        }
    }

module.exports = { getCart }