const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { VehicleSchema, updateVehicleSchema } = require('../validation/VehicleValidation');
const VehicleController = require('../controllers/VehicleController');
const multer = require("multer");
const {join} = require("node:path");
const fs = require("node:fs");
// Configure multer to use original file name
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
const uploadPath = join(__dirname, 'uploads/Vehicle');

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

// Define routes for Vehicle
router.get('/', VehicleController.getVehicles);
router.post('/', validateRequest(VehicleSchema), VehicleController.createVehicle);
router.get('/:id', VehicleController.getVehicleById);
router.put('/:id', validateRequest(updateVehicleSchema), VehicleController.updateVehicle);
router.delete('/:id', VehicleController.deleteVehicle);
 
module.exports = router;
