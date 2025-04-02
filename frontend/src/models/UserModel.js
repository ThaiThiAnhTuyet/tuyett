//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\frontend\src\models\UserModel.js
class UserModel {
   constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.age = data.age;
        this.role = data.role;
    }
}
module.exports = UserModel;


// [Form Đăng ký] ---> [POST /register]
//     |
//     |--> Controller gọi API backend /api/auth/register
//             |
//             |--> Nhận JSON trả về: user, token
//                     |
//                     |--> Tạo userModel --> Lưu vào session
//                             |
//                             |--> Hiển thị view: account.ejs với dữ liệu

// ✅ Lợi ích của phân lớp như bạn đang làm:
// Thành phần	Mục đích
// Model (userModel.js)	Lưu trữ dữ liệu dạng đối tượng
// Controller (authenticatecontroller.js)	Xử lý logic điều hướng + kết nối backend
// View (EJS)	Hiển thị giao diện với dữ liệu
// ✅ Kết nối frontend với API backend /api/auth/register
// ✅ Giải nén dữ liệu trả về JSON
// ✅ Tạo model lưu user, và dùng nó cho view