// const mysql = require("mysql");
// const util = require("util");
const { query } = require('express');
const { getConnection } = require('../db')
// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "ani",
//     password: "suman1979",
//     database: "ecommerce",
// });

// const query = util.promisify(conn.query).bind(conn)

const getProductView = async (req, res) => {
    const query = getConnection()
    try {
        let queryParameter = req.query.ID;

        let productQuery = `select * FROM Product WHERE id=${queryParameter};`;
        let product = await query(productQuery)
        result = product[0]
        let tagQuery = `select t.TAG as tagName from Tags t, Product_Tags pt where pt.PRODUCT_ID= ${queryParameter} and pt.TAGS_ID=t.id`;
        let tags = await query(tagQuery)
        const tagsData = tags.map(tag => {
            return tag.tagName
        })
        result["tags"] = tagsData
        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.json({ status: 500, error: err });
    }
}

module.exports = { getProductView }