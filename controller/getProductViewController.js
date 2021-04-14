const mysql = require("mysql");
var async = require('async');
const conn = mysql.createConnection({
    host: "localhost",
    user: "ani",
    password: "suman1979",
    database: "ecommerce",
});

const getProductView = (req, res) => {
    var queryParameter = req.query.ID;
    try {
        let queryParameter = req.query.ID;
        let sql = `select * FROM Product WHERE id=${queryParameter};`;
        conn.query(sql, (err, result) => {
            if (err) throw err;
            let response = result[0]
            let sql = `select t.TAG as tagName from Tags t, Product_Tags pt where pt.PRODUCT_ID= ${queryParameter} and pt.TAGS_ID=t.id`;
            conn.query(sql, (err, resultTag) => {
                const tags = resultTag.map(tag => {
                    return tag.tagName
                })
                if (err) throw err;
                response["tags"] = tags
                return res.json(response);
            });
        });
    } catch (err) {
        console.log(err)
        return res.json({ status: 500, error: err });
    }
}

module.exports = { getProductView }