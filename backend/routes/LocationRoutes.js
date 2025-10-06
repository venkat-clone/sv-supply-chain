const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { LocationSchema, updateLocationSchema } = require('../validation/LocationValidation');
const LocationController = require('../controllers/LocationController');
const multer = require("multer");
const {join} = require("node:path");
const fs = require("node:fs");
// Configure multer to use original file name
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
const uploadPath = join(__dirname, 'uploads/Location');

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

// Define routes for Location
router.get('/', LocationController.getLocations);
router.post('/', validateRequest(LocationSchema), LocationController.createLocation);
router.get('/:id', LocationController.getLocationById);
router.put('/:id', validateRequest(updateLocationSchema), LocationController.updateLocation);
router.delete('/:id', LocationController.deleteLocation);
 
module.exports = router;
