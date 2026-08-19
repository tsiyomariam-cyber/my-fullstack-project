const express = require("express");
const router = express.Router();

const db = require("../config/database");

// ======================================
// POST - Create a new request
// ======================================

router.post("/", (req, res) => {
    const { name, email, phone, request_text } = req.body;

    if (!name || !email || !request_text) {
        return res.status(400).json({
            message: "Name, email and request are required"
        });
    }

    const userSql = `
        INSERT INTO users (name, email, phone)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        phone = VALUES(phone)
    `;

    db.query(userSql, [name, email, phone], (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error saving user",
                error: err.message
            });
        }

        db.query(
            "SELECT id FROM users WHERE email = ?",
            [email],
            (err, userResult) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error finding user",
                        error: err.message
                    });
                }

                const userId = userResult[0].id;

                db.query(
                    "INSERT INTO requests (user_id, request_text) VALUES (?, ?)",
                    [userId, request_text],
                    (err, requestResult) => {

                        if (err) {
                            return res.status(500).json({
                                message: "Error saving request",
                                error: err.message
                            });
                        }

                        res.status(201).json({
                            message: "Request submitted successfully!",
                            requestId: requestResult.insertId
                        });

                    }
                );
            }
        );
    });
});


// ======================================
// GET - Get all requests
// ======================================

router.get("/", (req, res) => {

    const sql = `
        SELECT
            requests.id,
            users.name,
            users.email,
            users.phone,
            requests.request_text,
            requests.status,
            requests.created_at
        FROM requests
        JOIN users ON requests.user_id = users.id
        ORDER BY requests.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Error retrieving requests",
                error: err.message
            });
        }

        res.json(results);

    });
});


// ======================================
// PUT - Approve or Reject a request
// ======================================

router.put("/:id/status", (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({
            message: "Invalid status"
        });
    }

    const sql = `
        UPDATE requests
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error updating request",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        res.json({
            message: "Request status updated successfully"
        });

    });
});


module.exports = router;