//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\frontend\src\models\CartModel.js
class CartModel {
    constructor(data) {
        this.id = data._id;
        this.userId = data.userId;
        this.product = data.productId; // Đã populate từ backend
        this.quantity = data.quantity || 1;
    }
}
module.exports = CartModel;
