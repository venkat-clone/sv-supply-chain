const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { PermissionSchema, updatePermissionSchema } = require('../validation/PermissionValidation');
const PermissionController = require('../controllers/PermissionController');
const multer = require("multer");
const {join} = require("node:path");
const fs = require("node:fs");
// Configure multer to use original file name
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
const uploadPath = join(__dirname, 'uploads/Permission');

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

// Define routes for Permission
router.get('/', PermissionController.getPermissions);
router.post('/', validateRequest(PermissionSchema), PermissionController.createPermission);
router.get('/:id', PermissionController.getPermissionById);
router.put('/:id', validateRequest(updatePermissionSchema), PermissionController.updatePermission);
router.delete('/:id', PermissionController.deletePermission);
 
module.exports = router;
