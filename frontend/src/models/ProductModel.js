class ProductModel {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.price = data.price;
        this.description = data.description;
        this.category = data.category?.name || "Không rõ";
        this.images = [
            data.URLImage,
            data.URLImage1,
            data.URLImage2,
            data.URLImage3,
            data.URLImage4
        ].filter(Boolean); // Chỉ lấy link ảnh không rỗng
    }
}
module.exports = ProductModel;