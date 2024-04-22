const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");

// Hàm kiểm tra tính hợp lệ của địa chỉ email
function isValidEmail(email) {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Đăng ký người dùng mới
router.post("/create", (req, res) => {
    const { name, email, credit, phone, role, date } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!name || !email || !credit || !phone || !role || !date) {
        return res.status(422).json("Please fill all required fields.");
    }

    // Kiểm tra tính hợp lệ của địa chỉ email
    if (!isValidEmail(email)) {
        return res.status(422).json("Invalid email format.");
    }

    // Kiểm tra email đã tồn tại trong cơ sở dữ liệu hay chưa
    conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
        if (err) {
            return res.status(500).json("Internal Server Error");
        }

        // Nếu đã tồn tại người dùng với email này, trả về lỗi
        if (result && result.length > 0) {
            return res.status(409).json("A user with this email already exists.");
        }
        // Nếu không có lỗi và email hợp lệ, thêm người dùng vào cơ sở dữ liệu
        conn.query("INSERT INTO users SET ?", { name, email, credit, phone, role, date }, (err, result) => {
            if (err) {
                console.log("Error inserting user:", err);
                return res.status(500).json("Failed to create user.");
            }
            return res.status(201).json(req.body);
        });
    });
});
// get userdata

router.get("/getusers", (req, res) => {

    conn.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});


// user delete api

router.delete("/deleteuser/:id", (req, res) => {

    const { id } = req.params;

    conn.query("DELETE FROM users WHERE id = ? ", id, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});



// get single user

router.get("/induser/:id", (req, res) => {

    const { id } = req.params;

    conn.query("SELECT * FROM users WHERE id = ? ", id, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});


// update users api


router.put("/updateuser", (req, res) => {

    const { id } = req.params;

    const data = req.body;

    conn.query("UPDATE users SET ? WHERE id = ? ", [data, id], (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
        } else {
            res.status(201).json(result);
        }
    })
});
// Các route khác không thay đổi
router.get("/getallusers", (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json(result);
    });
});
module.exports = router;
