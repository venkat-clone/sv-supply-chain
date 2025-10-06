const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { RegisterSchema, LoginSchema } = require("../validation/AuthValidation");
const AuthController = require("../controllers/AuthController");
const fs = require("node:fs");
const authMiddleware = require("../middleware/authMiddleware");




router.get('/',authMiddleware, AuthController.getProfile);
router.post(
  "/register",
  validateRequest(RegisterSchema),
  AuthController.register
);

router.post(
  "/login",
  validateRequest(LoginSchema),
  AuthController.login
);
 
module.exports = router;
