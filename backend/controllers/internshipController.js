const db = require("../config/db");

const createInternship = (req, res) => {
    const {
        title,
        company,
        location,
        type,
        duration,
        description,
        requirements,
        deadline
    } = req.body;

    if (!title || !company || !description) {
        return res.status(400).json({
            message: "Title, company and description are required"
        });
    }

    const sql = `
        INSERT INTO internships
        (title, company, location, type, duration, description, requirements, deadline)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, company, location, type, duration, description, requirements, deadline],
        (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Internship creation failed"
                });
            }

            res.status(201).json({
                message: "Internship added successfully"
            });
        }
    );
};

const getAllInternships = (req, res) => {
    const { search, location, type } = req.query;

    let sql = `
        SELECT * FROM internships
        WHERE 1 = 1
    `;

    const values = [];

    if (search) {
        sql += ` AND (title LIKE ? OR company LIKE ?)`;
        values.push(`%${search}%`, `%${search}%`);
    }

    if (location) {
        sql += ` AND location LIKE ?`;
        values.push(`%${location}%`);
    }

    if (type) {
        sql += ` AND type = ?`;
        values.push(type);
    }

    sql += ` ORDER BY created_at DESC`;

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to fetch internships"
            });
        }

        res.status(200).json(result);
    });
};

const getInternshipById = (req, res) => {
    const internshipId = req.params.id;

    const sql = `SELECT * FROM internships WHERE internship_id = ?`;

    db.query(sql, [internshipId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to fetch internship"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        res.status(200).json(result[0]);
    });
};

const updateInternship = (req, res) => {
    const internshipId = req.params.id;

    const {
        title,
        company,
        location,
        type,
        duration,
        description,
        requirements,
        deadline
    } = req.body;

    const sql = `
        UPDATE internships
        SET title = ?, company = ?, location = ?, type = ?, duration = ?,
            description = ?, requirements = ?, deadline = ?
        WHERE internship_id = ?
    `;

    db.query(
        sql,
        [
            title,
            company,
            location,
            type,
            duration,
            description,
            requirements,
            deadline,
            internshipId
        ],
        (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Internship update failed"
                });
            }

            res.status(200).json({
                message: "Internship updated successfully"
            });
        }
    );
};

const deleteInternship = (req, res) => {
    const internshipId = req.params.id;

    const sql = `DELETE FROM internships WHERE internship_id = ?`;

    db.query(sql, [internshipId], (err) => {
        if (err) {
            return res.status(500).json({
                message: "Internship delete failed"
            });
        }

        res.status(200).json({
            message: "Internship deleted successfully"
        });
    });
};

module.exports = {
    createInternship,
    getAllInternships,
    getInternshipById,
    updateInternship,
    deleteInternship
};