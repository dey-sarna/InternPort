const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    getProfile,
    updateProfile
} = require("../controllers/studentController");

router.get(
    "/profile",
    authMiddleware,
    roleMiddleware("student"),
    getProfile
);

router.put(
    "/profile",
    authMiddleware,
    roleMiddleware("student"),
    updateProfile
);

module.exports = router;