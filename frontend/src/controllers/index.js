var express = require("express");
var router = express.Router();

router.use("/home", require(__dirname + "/homecontroller"));
router.use("/", require(__dirname + "/productcontroller"));
router.use("/", require(__dirname + "/blogcontroller"));
router.use("/about", require(__dirname + "/aboutcontroller"));
router.use("/lienhe", require(__dirname + "/lienhecontroller"));
router.use("/", require(__dirname + "/loginregistercontroller"));


router.use("/", require(__dirname + "/admin/admincontroller"));


router.get("/", function(req, res) {
    res.render("index.ejs");
});
module.exports = router;