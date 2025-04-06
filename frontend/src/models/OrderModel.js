// D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\frontend\src\models\OrderModel.js
class OrderModel {
    constructor(data) {
        this.id = data._id;
        this.userId = data.userId;
        this.products = data.products.map(p => ({
            product: p.productId, // đã populate
            quantity: p.quantity
        }));
        this.total = data.totalAmount;
        this.paidAt = new Date(data.paidAt);
    }
}
module.exports = OrderModel;
