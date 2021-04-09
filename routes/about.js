var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.json('Welcome to You in About Page');
    res.json(req.query.name);
});

module.exports = router;
