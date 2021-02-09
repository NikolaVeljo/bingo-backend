const express = require("express");
const router = express.Router();
const authHandler = require("../middlewares/authHandler");
const authController = require("../controllers/auth");
const profileController = require("../controllers/profile");

router.post("/sign-up", authController.signUp);
router.post("/email-confirm", authController.emailConfirm);
router.post('/resend-email', authController.resendEmailToken);
router.post("/sign-in", authController.signIn);
router.get("/sign-out", authController.signOut);
router.get("/get-user", authHandler, authController.getUser);
router.get("/profile", authHandler, profileController.profile);

module.exports = router;
