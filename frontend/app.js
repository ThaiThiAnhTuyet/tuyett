const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

// Cấu hình views và static files
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));

// Middleware xử lý form và session
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}));

// Import controller
const controller = require(__dirname + "/src/controllers");
app.use(controller);

// Khởi động server
const server = app.listen(3000, function() {
    console.log("✅ Mở http://localhost:3000 Kiểm tra frontend hoạt động.");
});