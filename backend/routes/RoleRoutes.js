const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { RoleSchema, updateRoleSchema } = require('../validation/RoleValidation');
const RoleController = require('../controllers/RoleController');
const multer = require("multer");
const {join} = require("node:path");
const fs = require("node:fs");
// Configure multer to use original file name
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
const uploadPath = join(__dirname, 'uploads/Role');

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

// Define routes for Role
router.get('/', RoleController.getRoles);
router.post('/', validateRequest(RoleSchema), RoleController.createRole);
router.get('/:id', RoleController.getRoleById);
router.put('/:id', validateRequest(updateRoleSchema), RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);
 
module.exports = router;
