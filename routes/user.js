const express = require("express");
const router = express.Router();
const authHandler = require("../middlewares/authHandler");
const authController = require("../controllers/auth");
const profileController = require("../controllers/profile");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.get("/sign-out", authController.signOut);

router.get("/profile", profileController.profile);

module.exports = router;
