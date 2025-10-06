const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { RolePermissionSchema, updateRolePermissionSchema } = require('../validation/RolePermissionValidation');
const RolePermissionController = require('../controllers/RolePermissionController');
const multer = require("multer");
const {join} = require("node:path");
const fs = require("node:fs");
// Configure multer to use original file name
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
const uploadPath = join(__dirname, 'uploads/RolePermission');

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

// Define routes for RolePermission
router.get('/', RolePermissionController.getRolePermissions);
router.post('/', validateRequest(RolePermissionSchema), RolePermissionController.createRolePermission);
router.get('/:id', RolePermissionController.getRolePermissionById);
router.put('/:id', validateRequest(updateRolePermissionSchema), RolePermissionController.updateRolePermission);
router.delete('/:id', RolePermissionController.deleteRolePermission);
 
module.exports = router;
