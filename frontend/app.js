var express = require("express");
var app = express();


// Cấu hình views và static files
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");
// ✅ Cấu hình đúng đường dẫn đến static files
app.use("/static", express.static(__dirname + "/public"));

// Import controller
var controller = require(__dirname + "/src/controllers");
app.use(controller);

var server = app.listen(3000, function() {
    console.log("✅ server is running");
});