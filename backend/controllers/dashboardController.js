const db = require("../config/db");

const getStudentDashboard = (req, res) => {
    const userId = req.user.user_id;

    const sql = `
        SELECT
            COUNT(a.application_id) AS totalApplications,
            SUM(a.status = 'Accepted') AS acceptedApplications,
            SUM(a.status = 'Pending') AS pendingApplications,
            SUM(a.status = 'Rejected') AS rejectedApplications
        FROM applications a
        JOIN students s ON a.student_id = s.student_id
        WHERE s.user_id = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to load student dashboard"
            });
        }

        res.status(200).json(result[0]);
    });
};

const getAdminDashboard = (req, res) => {
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM users WHERE role = 'student') AS totalStudents,
            (SELECT COUNT(*) FROM internships) AS totalInternships,
            (SELECT COUNT(*) FROM applications) AS totalApplications
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to load admin dashboard"
            });
        }

        res.status(200).json(result[0]);
    });
};

module.exports = {
    getStudentDashboard,
    getAdminDashboard
};