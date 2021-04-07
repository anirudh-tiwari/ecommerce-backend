var express = require('express');
var router = express.Router();
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});

let upload = multer({ storage: storage });

router.post('/', upload.single('image'), function (req, res) {
    message: "Error! in image upload."
    if (!req.file) {
        console.log("No file received");
        message = "Error! in image upload."
        res.render('index', { message: message, status: 'danger' });

    } else {
        console.log('file received');
        console.log(req.file);
        //   var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";

        //           var query = db.query(sql, function(err, result) {
        //              console.log('inserted data');
        //           });
        message = "Successfully! uploaded";
        res.render('index', { message: message, status: 'success' });

    }
});

module.exports = router;
