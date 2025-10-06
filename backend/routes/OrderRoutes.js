const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/utils');
const { OrderSchema, updateOrderSchema } = require('../validation/OrderValidation');
const OrderController = require('../controllers/OrderController');
const multer = require("multer");
const {join} = require("node:path");
const fs = require("node:fs");
// Configure multer to use original file name
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
const uploadPath = join(__dirname, 'uploads/Order');

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

// Define routes for Order
router.get('/', OrderController.getOrders);
router.post('/', validateRequest(OrderSchema), OrderController.createOrder);
router.get('/:id', OrderController.getOrderById);
router.put('/:id', validateRequest(updateOrderSchema), OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);
 
module.exports = router;
