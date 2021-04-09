const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "ani",
    password: "suman1979",
    database: "ecommerce",
});

const getSearchProduct = (req, res) => {
    try {
        let queryParameter = req.query.type;
        let sql = `SELECT * FROM Product where TYPE = "${queryParameter}"`;
        let query = conn.query(sql, (err, result) => {
            console.log("SQL HERER====>", queryParameter)
            if (err) throw err;
            // return res.json({ status: 200, error: null, response: result });
            return res.json(result);
        });
    } catch (err) {
        console.log(err)
        return res.json({ status: 500, error: err });
    }
}

module.exports = { getSearchProduct }