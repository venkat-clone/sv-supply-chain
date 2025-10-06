const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { VehicleTypeSchema, updateVehicleTypeSchema } = require('../validation/VehicleTypeValidation');
const VehicleTypeController = require('../controllers/VehicleTypeController');
const multer = require("multer");
const {join} = require("node:path");
const fs = require("node:fs");
// Configure multer to use original file name
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
const uploadPath = join(__dirname, 'uploads/VehicleType');

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

// Define routes for VehicleType
router.get('/', VehicleTypeController.getVehicleTypes);
router.post('/', validateRequest(VehicleTypeSchema), VehicleTypeController.createVehicleType);
router.get('/:id', VehicleTypeController.getVehicleTypeById);
router.put('/:id', validateRequest(updateVehicleTypeSchema), VehicleTypeController.updateVehicleType);
router.delete('/:id', VehicleTypeController.deleteVehicleType);
 
module.exports = router;
