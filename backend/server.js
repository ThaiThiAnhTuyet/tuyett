const express = require("express");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// 📝 Cấu hình Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Website Bán Điện Thoại",
            version: "1.0.0",
            description: "Tài liệu API sử dụng Swagger",
            contact: {
                name: "Admin",
            },
            servers: ["http://localhost:5000"],
        },
    },
    apis: [__dirname + "/src/controllers/*.js"], // Đọc file API từ thư mục controllers
};

// Tạo Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Hỗ trợ dữ liệu từ form


const connectDB = require("./config/database");
connectDB();

// Import controller
var controller = require(__dirname + "/src/controllers");
app.use(controller);

// Khởi động server backend
var server = app.listen(5000, function() {
    console.log("✅ Mở http://localhost:5000 để kiểm tra API hoạt động.");
});