// D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\backend\src\util\checkRole.js
function checkRole(requiredRole) {
    return (req, res, next) => {
        if (!req.userData || !req.userData.user) {
            return res.status(403).json({ message: "Không xác định được người dùng" });
        }

        const { role } = req.userData.user;

        if (role !== requiredRole) {
            return res.status(403).json({ message: `Bạn cần quyền ${requiredRole} để truy cập` });
        }

        next();
    };
}

function checkMultiRole(allowedRoles = []) {
    return (req, res, next) => {
        if (!req.userData || !req.userData.user) {
            return res.status(403).json({ message: "Không xác định được người dùng" });
        }

        const userRole = req.userData.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: `Bạn cần quyền: ${allowedRoles.join(" hoặc ")} để truy cập` });
        }

        next();
    };
}

module.exports = checkRole;
module.exports.checkMultiRole = checkMultiRole;