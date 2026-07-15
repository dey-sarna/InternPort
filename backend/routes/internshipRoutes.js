const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createInternship,
    getAllInternships,
    getInternshipById,
    updateInternship,
    deleteInternship
} = require("../controllers/internshipController");

router.get("/", getAllInternships);
router.get("/:id", getInternshipById);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createInternship
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateInternship
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteInternship
);

module.exports = router;