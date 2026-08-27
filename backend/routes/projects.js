const express = require("express");
const router  = express.Router();
const db      = require("../config/database");

// ======================================
// POST - Create a new project
// ======================================

router.post("/", (req, res) => {
    try {
        const {
            requestId,
            clientName,
            clientEmail,
            clientPhone,
            projectName,
            description,
            startDate,
            deadline,
            totalAmount,
            paidAmount,
        } = req.body;

        // Validation
        if (!projectName || !clientName || !clientEmail || !totalAmount) {
            return res.status(400).json({
                message: "projectName, clientName, clientEmail and totalAmount are required"
            });
        }

        const paidAmt = Number(paidAmount) || 0;
        const totalAmt = Number(totalAmount);
        const remainingAmt = totalAmt - paidAmt;

        const sql = `
            INSERT INTO projects
                (request_id, client_name, client_email, client_phone,
                 project_name, description, start_date, deadline,
                 total_amount, paid_amount, remaining_amount,
                 progress, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'Not Started')
        `;

        const values = [
            requestId    || null,
            clientName,
            clientEmail,
            clientPhone  || null,
            projectName,
            description  || null,
            startDate    || null,
            deadline     || null,
            totalAmt,
            paidAmt,
            remainingAmt,
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({
                    message: "Error creating project",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Project created successfully",
                projectId: result.insertId
            });
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// ======================================
// GET - Get all projects
// ======================================

router.get("/", (req, res) => {
    const sql = `
        SELECT
            id,
            request_id       AS requestId,
            client_name      AS clientName,
            client_email     AS clientEmail,
            client_phone     AS clientPhone,
            project_name     AS projectName,
            description,
            start_date       AS startDate,
            deadline,
            total_amount     AS totalAmount,
            paid_amount      AS paidAmount,
            remaining_amount AS remainingAmount,
            progress,
            status,
            created_at       AS createdAt
        FROM projects
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error retrieving projects",
                error: err.message
            });
        }

        res.json(results);
    });
});

// ======================================
// PUT - Update project progress, payment, status
// ======================================

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { progress, paidAmount, remainingAmount, status } = req.body;
    const numericProgress = Number(progress);
    const numericPaidAmount = Number(paidAmount);

    if (!Number.isFinite(numericProgress) || numericProgress < 0 || numericProgress > 100) {
        return res.status(400).json({ message: "Progress must be between 0 and 100" });
    }

    if (!Number.isFinite(numericPaidAmount) || numericPaidAmount < 0) {
        return res.status(400).json({ message: "Paid amount must be a non-negative number" });
    }

    const sql = `
        UPDATE projects
        SET
            progress         = ?,
            paid_amount      = ?,
            remaining_amount = total_amount - ?,
            status           = ?
        WHERE id = ?
    `;

    db.query(sql, [numericProgress, numericPaidAmount, numericPaidAmount, status, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error updating project",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project updated successfully" });
    });
});

module.exports = router;
