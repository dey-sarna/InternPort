const db = require("../config/db");

const applyForInternship = (req, res) => {
    const userId = req.user.user_id;
    const internshipId = req.params.internshipId;

    const findStudentSql = "SELECT student_id FROM students WHERE user_id = ?";

    db.query(findStudentSql, [userId], (err, studentResult) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (studentResult.length === 0) {
            return res.status(404).json({ message: "Student profile not found" });
        }

        const studentId = studentResult[0].student_id;

        const checkSql = `
            SELECT * FROM applications
            WHERE student_id = ? AND internship_id = ?
        `;

        db.query(checkSql, [studentId, internshipId], (err, existingApplication) => {
            if (err) {
                return res.status(500).json({ message: "Database error" });
            }

            if (existingApplication.length > 0) {
                return res.status(400).json({
                    message: "You have already applied for this internship"
                });
            }

            const insertSql = `
                INSERT INTO applications (student_id, internship_id)
                VALUES (?, ?)
            `;

            db.query(insertSql, [studentId, internshipId], (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Application failed"
                    });
                }

                res.status(201).json({
                    message: "Application submitted successfully"
                });
            });
        });
    });
};

const getMyApplications = (req, res) => {
    const userId = req.user.user_id;

    const sql = `
        SELECT 
            a.application_id,
            a.status,
            a.applied_at,
            i.internship_id,
            i.title,
            i.company,
            i.location,
            i.type,
            i.duration,
            i.deadline
        FROM applications a
        JOIN students s ON a.student_id = s.student_id
        JOIN internships i ON a.internship_id = i.internship_id
        WHERE s.user_id = ?
        ORDER BY a.applied_at DESC
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to fetch applications"
            });
        }

        res.status(200).json(result);
    });
};

const getAllApplications = (req, res) => {
    const sql = `
        SELECT
            a.application_id,
            a.status,
            a.applied_at,
            u.name AS student_name,
            u.email AS student_email,
            s.department,
            s.semester,
            s.phone,
            s.skills,
            i.title AS internship_title,
            i.company,
            i.location,
            i.type
        FROM applications a
        JOIN students s ON a.student_id = s.student_id
        JOIN users u ON s.user_id = u.user_id
        JOIN internships i ON a.internship_id = i.internship_id
        ORDER BY a.applied_at DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to fetch all applications"
            });
        }

        res.status(200).json(result);
    });
};

const updateApplicationStatus = (req, res) => {
    const applicationId = req.params.applicationId;
    const { status } = req.body;

    const allowedStatus = ["Pending", "Accepted", "Rejected"];

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({
            message: "Invalid status"
        });
    }

    const sql = `
        UPDATE applications
        SET status = ?
        WHERE application_id = ?
    `;

    db.query(sql, [status, applicationId], (err) => {
        if (err) {
            return res.status(500).json({
                message: "Status update failed"
            });
        }

        res.status(200).json({
            message: "Application status updated successfully"
        });
    });
};

module.exports = {
    applyForInternship,
    getMyApplications,
    getAllApplications,
    updateApplicationStatus
};