const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    getStudentDashboard,
    getAdminDashboard
} = require("../controllers/dashboardController");

router.get(
    "/student",
    authMiddleware,
    roleMiddleware("student"),
    getStudentDashboard
);

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    getAdminDashboard
);

module.exports = router;