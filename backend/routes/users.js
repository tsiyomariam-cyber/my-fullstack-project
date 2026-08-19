const express = require("express");
const router = express.Router();

const db = require("../config/database");

// GET all users
router.get("/", (req, res) => {
    const sql = `
        SELECT id, name, email, phone
        FROM users
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error getting users",
                error: err.message
            });
        }

        res.json(results);
    });
});

module.exports = router;