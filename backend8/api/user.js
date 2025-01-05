const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Match exact filename
const authMiddleware = require("../middleware/authentication");
const multer = require("multer");
const upload = multer();  // Initialize multer here

//uncomment after testing!!
router.use(authMiddleware);

// Protected routes
// router.get("/profile", userController.getProfile);
// router.put("/profile", userController.updateProfile);
// router.get("/major/:major", userController.getUsersByMajor);
// router.post("/courses/:courseId/enroll", userController.enrollInCourse);
// router.post("/posts", userController.createPost);

//newly added
router.post("/editprofile", userController.editProfile);
router.get("/profiles", userController.getAllUsers)
router.post( "/createnew", userController.createNew);
router.get('/images', userController.getImages);
router.get('/liked/:img_id', userController.checkLiked);
router.post('/like', userController.likeImage);
router.post('/post-image', userController.postImage);
router.get('/:id', userController.getUserByID);
router.put('/:id/edit', upload.none(), userController.updateUser)

module.exports = router;