const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/tuandan");
        // await mongoose.connect("mongodb+srv://tuandan:ELjWtaHYy2z4BsRZ@trinhtuandan-mongodb.fhup4.mongodb.net/nhom5conbao?retryWrites=true&w=majority&appName=trinhtuandan-mongodb");
        console.log("✅ Kết nối MongoDB thành công!");
    } catch (error) {
        console.error("❌ Kết nối MongoDB thất bại:", error);
        process.exit(1);
    }
};

module.exports = connectDB;