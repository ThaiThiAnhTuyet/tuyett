var express = require("express");
var router = express.Router();


router.use("/", require(__dirname + "/loginregistercontroller"));

router.get("/", function(req, res) {
    res.render("index.ejs");
});
module.exports = router;