const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { UserSchema, updateUserSchema } = require('../validation/UserValidation');
const UserController = require('../controllers/UserController');
const multer = require("multer");
const {join} = require("node:path");
const fs = require("node:fs");
// Configure multer to use original file name
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
const uploadPath = join(__dirname, 'uploads/User');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

cb(null, uploadPath);
 },
 filename: (req, file, cb) => {
  const originalName = file.originalname;
  cb(null, originalName); // Use the original file name
 },
});

const upload = multer({ storage: storage });

// Define routes for User
router.get('/', UserController.getUsers);
router.post('/', validateRequest(UserSchema), UserController.createUser);
router.get('/:id', UserController.getUserById);
router.put('/:id', validateRequest(updateUserSchema), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
 
module.exports = router;
