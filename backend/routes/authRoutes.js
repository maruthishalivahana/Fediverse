const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/google", authController.googleAuth);
// DELETE /posts/:postId
router.delete("/posts/:postId", verifyToken, authController.deletePost);

router.post("/verify-otp", authController.verifyOtp);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Remove duplicate /google route (keep only one)

module.exports = router;
