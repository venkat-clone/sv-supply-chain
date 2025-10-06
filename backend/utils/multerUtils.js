const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // To check and create the folder dynamically
const { createUser } = require("../services/UserService");

// Helper function to configure storage dynamically based on subfolder
const getStorageConfig = (subfolder) => multer.diskStorage({
    destination: (req, file, cb) => {
        // Define folder path dynamically based on subfolder
        const folderPath = path.join('./', 'uploads', subfolder || 'others');

        // Ensure the folder exists, create it if necessary
        fs.existsSync(folderPath) || fs.mkdirSync(folderPath, { recursive: true });

        console.log(`Request File ${file.originalname}`);
        console.log("Folder path", folderPath);
        cb(null, folderPath);  // Store file in the dynamic folder
    },
    filename: (req, file, cb) => {
        // Generate a unique filename based on current timestamp and original file extension
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);  // Use the generated filename
    },
});

// Helper function to create upload middleware dynamically
const createUploadMiddlewareImage = (subfolder, fileField = 'images', multiple = false) => {
    const storage = getStorageConfig(subfolder);
    console.log(`subFolder ${subfolder}, file ${fileField}, multiple ${multiple}`);
    return multiple
        ? multer({ storage }).array(fileField)
        : multer({ storage }).single(fileField);
};
const createUploadMiddleware = (subfolder, fileField = 'file', multiple = false) => {
    const storage = getStorageConfig(subfolder);
    console.log(`subFolder ${subfolder}, file ${fileField}, multiple ${multiple}`);
    return multiple
        ? multer({ storage }).array(fileField)
        : multer({ storage }).single(fileField);
};

// Middleware to handle single file upload
const singleUpload = (subfolder) => (req, res, next) => {
    const uploadMiddleware = createUploadMiddleware(subfolder, 'file'); // Default file field is 'file'
    console.log(`upload upload success: ${req.file ? req.file.filename : 'No file uploaded'}`);
    uploadMiddleware(req, res, (err) => {
        console.log(`upload upload success: ${req.file ? req.file.filename : 'No file uploaded'}`);

        if (err) {
            return res.status(400).send(`File upload error: ${err.message}`);
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        next();  // Proceed to the next middleware
    });
};

// Middleware to handle multiple file upload
const multiUploadImage = (subfolder) => (req, res, next) => {
    const uploadMiddleware = createUploadMiddlewareImage(subfolder, 'images', true); // 'images' field for multiple uploads

    uploadMiddleware(req, res, (err) => {
        if (err) {
            return res.status(400).send(`File upload error: ${err.message}`);
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        req.body.images = req.files.map(file => file.filename); // Save uploaded files as images

        next();
    });
};

const multiUpload = (subfolder) => (req, res, next) => {
    const uploadMiddleware = createUploadMiddleware(subfolder, 'files', true); // 'files' field for multiple files

    uploadMiddleware(req, res, (err) => {
        if (err) {
            return res.status(400).send(`File upload error: ${err.message}`);
        }

        if (req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        next();  // Proceed to the next middleware
    });
};


module.exports = {
    singleUpload,
    multiUpload,
    createUploadMiddlewareImage,
    multiUploadImage
}