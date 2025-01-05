const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Match exact filename
const authMiddleware = require("../middleware/authentication");
//for image upload from formData()-- yet to be implemented!
const multer = require("multer");
const upload = multer(); 

//uncomment after testing!!
router.use(authMiddleware);


//protected routes
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