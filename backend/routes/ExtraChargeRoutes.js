const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { ExtraChargeSchema, updateExtraChargeSchema } = require('../validation/ExtraChargeValidation');
const ExtraChargeController = require('../controllers/ExtraChargeController');
const multer = require("multer");
const {join} = require("node:path");
const fs = require("node:fs");
// Configure multer to use original file name
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
const uploadPath = join(__dirname, 'uploads/ExtraCharge');

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

// Define routes for ExtraCharge
router.get('/', ExtraChargeController.getExtraCharges);
router.post('/', validateRequest(ExtraChargeSchema), ExtraChargeController.createExtraCharge);
router.get('/:id', ExtraChargeController.getExtraChargeById);
router.put('/:id', validateRequest(updateExtraChargeSchema), ExtraChargeController.updateExtraCharge);
router.delete('/:id', ExtraChargeController.deleteExtraCharge);
 
module.exports = router;
