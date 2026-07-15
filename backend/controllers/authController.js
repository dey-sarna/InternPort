const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
        return res.status(400).json({
            message: "Name cannot be empty"
        });
    }

    try {
        const checkUserSql = `
            SELECT user_id
            FROM users
            WHERE email = ?
        `;

        db.query(checkUserSql, [cleanEmail], async (err, result) => {
            if (err) {
                console.error("Email check error:", err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (result.length > 0) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);

                const role = "student";

                const insertUserSql = `
                    INSERT INTO users (name, email, password, role)
                    VALUES (?, ?, ?, ?)
                `;

                db.query(
                    insertUserSql,
                    [cleanName, cleanEmail, hashedPassword, role],
                    (userError, userResult) => {
                        if (userError) {
                            console.error("User registration error:", userError);

                            return res.status(500).json({
                                message: "User registration failed"
                            });
                        }

                        const insertStudentSql = `
                            INSERT INTO students (user_id)
                            VALUES (?)
                        `;

                        db.query(
                            insertStudentSql,
                            [userResult.insertId],
                            (studentError) => {
                                if (studentError) {
                                    console.error(
                                        "Student profile creation error:",
                                        studentError
                                    );

                                    const deleteUserSql = `
                                        DELETE FROM users
                                        WHERE user_id = ?
                                    `;

                                    db.query(
                                        deleteUserSql,
                                        [userResult.insertId],
                                        (deleteError) => {
                                            if (deleteError) {
                                                console.error(
                                                    "User rollback error:",
                                                    deleteError
                                                );
                                            }

                                            return res.status(500).json({
                                                message:
                                                    "Student profile creation failed"
                                            });
                                        }
                                    );

                                    return;
                                }

                                return res.status(201).json({
                                    message: "Registration successful",
                                    user: {
                                        user_id: userResult.insertId,
                                        name: cleanName,
                                        email: cleanEmail,
                                        role
                                    }
                                });
                            }
                        );
                    }
                );
            } catch (hashError) {
                console.error("Password hashing error:", hashError);

                return res.status(500).json({
                    message: "Password processing failed"
                });
            }
        });
    } catch (error) {
        console.error("Registration server error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const cleanEmail = email.trim().toLowerCase();

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [cleanEmail], async (err, result) => {
        if (err) {
            console.error("Login database error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result[0];

        try {
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            if (!process.env.JWT_SECRET) {
                console.error("JWT_SECRET is missing");

                return res.status(500).json({
                    message: "Server configuration error"
                });
            }

            const token = jwt.sign(
                {
                    user_id: user.user_id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error("Login processing error:", error);

            return res.status(500).json({
                message: "Login failed"
            });
        }
    });
};

module.exports = {
    register,
    login
};