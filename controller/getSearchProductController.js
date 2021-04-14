const { query } = require('express');
const { getConnection } = require('../db')


const getSearchProduct = async (req, res) => {
    const query = getConnection()
    try {
        let queryParameter = req.query.type;

        let productQuery = `select p.ID, p.NAME,p.IMAGE,p.ORIGINAL_PRICE,p.DISCOUNT_PRICE, p.DESCRIPTION, t.TAG from Product p, Tags t, Product_Tags pt where t.TAG="${queryParameter}" and pt.PRODUCT_ID=p.id and pt.TAGS_ID=t.id`;
        let product = await query(productQuery)
        console.log(product)
        result = product
        // let tagQuery = `select t.TAG as tagName from Tags t, Product_Tags pt where pt.PRODUCT_ID= ${queryParameter} and pt.TAGS_ID=t.id`;
        // let tags = await query(tagQuery)
        // const tagsData = tags.map(tag => {
        //     return tag.tagName
        // })
        // result["tags"] = tagsData
        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.json({ status: 500, error: err });
    }
    // try {
    //     let queryParameter = req.query.type;
    //     let sql = `SELECT * FROM Product where TYPE = "${queryParameter}"`;
    //     let query = conn.query(sql, (err, result) => {
    //         console.log("SQL HERER====>", queryParameter)
    //         if (err) throw err;
    //         // return res.json({ status: 200, error: null, response: result });
    //         return res.json(result);
    //     });
    // } catch (err) {
    //     console.log(err)
    //     return res.json({ status: 500, error: err });
    // }
}

module.exports = { getSearchProduct }