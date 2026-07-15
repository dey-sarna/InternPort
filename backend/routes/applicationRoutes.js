const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    applyForInternship,
    getMyApplications,
    getAllApplications,
    updateApplicationStatus
} = require("../controllers/applicationController");

router.post(
    "/apply/:internshipId",
    authMiddleware,
    roleMiddleware("student"),
    applyForInternship
);

router.get(
    "/my-applications",
    authMiddleware,
    roleMiddleware("student"),
    getMyApplications
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAllApplications
);

router.put(
    "/:applicationId/status",
    authMiddleware,
    roleMiddleware("admin"),
    updateApplicationStatus
);

module.exports = router;