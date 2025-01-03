const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Match exact filename
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);

// Protected routes
router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.get("/major/:major", userController.getUsersByMajor);
router.post("/courses/:courseId/enroll", userController.enrollInCourse);
router.post("/posts", userController.createPost);

//newly added
router.post("/editprofile", userController.editProfile);
router.get("users/profiles", userController.getAllUsers)

module.exports = router;