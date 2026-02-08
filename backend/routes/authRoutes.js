const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/google", authController.googleAuth);
// DELETE /posts/:postId
router.delete("/posts/:postId", verifyToken, authController.deletePost);

module.exports = router;
router.post("/verify-otp", authController.verifyOtp);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/google", authController.googleAuth);
