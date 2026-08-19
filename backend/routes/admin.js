const express = require("express");
const router = express.Router();

const db = require("../config/database");

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    const sql = `
        SELECT id, username
        FROM admins
        WHERE username = ? AND password = ?
    `;

    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        res.json({
            message: "Login successful",
            admin: results[0]
        });
    });
});

module.exports = router;