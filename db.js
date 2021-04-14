const mysql = require("mysql");
const util = require("util");

function getConnection() {
    const conn = mysql.createConnection({
        host: "localhost",
        user: "ani",
        password: "suman1979",
        database: "ecommerce",
    });

    return util.promisify(conn.query).bind(conn)
}

module.exports = {
    getConnection
}