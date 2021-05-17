var express = require('express');
var router = express.Router();
const { sendController } = require("../controller/sendController")
const { verifyController } = require("../controller/verifyController")


router.post("/send", sendController);

router.post("/verify", verifyController);

module.exports = router;