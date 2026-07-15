const db = require("../config/db");

const getProfile = (req, res) => {
    const userId = req.user.user_id;

    const sql = `
        SELECT 
            u.user_id,
            u.name,
            u.email,
            s.student_id,
            s.department,
            s.semester,
            s.phone,
            s.skills,
            s.bio
        FROM users u
        LEFT JOIN students s ON u.user_id = s.user_id
        WHERE u.user_id = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(result[0]);
    });
};

const updateProfile = (req, res) => {
    const userId = req.user.user_id;

    const {
        name,
        department,
        semester,
        phone,
        skills,
        bio
    } = req.body;

    const updateUserSql = `
        UPDATE users 
        SET name = ?
        WHERE user_id = ?
    `;

    const updateStudentSql = `
        UPDATE students
        SET department = ?, semester = ?, phone = ?, skills = ?, bio = ?
        WHERE user_id = ?
    `;

    db.query(updateUserSql, [name, userId], (err) => {
        if (err) {
            return res.status(500).json({ message: "User update failed" });
        }

        db.query(
            updateStudentSql,
            [department, semester, phone, skills, bio, userId],
            (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Profile update failed"
                    });
                }

                res.status(200).json({
                    message: "Profile updated successfully"
                });
            }
        );
    });
};

module.exports = {
    getProfile,
    updateProfile
};