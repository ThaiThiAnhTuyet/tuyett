class CartModel {
    constructor(data) {
        this.id = data._id;
        this.userId = data.userId;
        this.product = data.productId; // Đã populate từ backend
        this.quantity = data.quantity || 1;
    }
}
module.exports = CartModel;
