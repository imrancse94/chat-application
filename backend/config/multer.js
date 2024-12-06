const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { FILE_UPLOAD_DIR } = require('../utils/constant');

const createDirectory = (dirPath) => {
  try {
      if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
          console.log(`Directory created: ${dirPath}`);
      } else {
          console.log(`Directory already exists: ${dirPath}`);
      }
  } catch (err) {
      console.error(`Error creating directory: ${err.message}`);
  }
};

const final_path = path.join(path.resolve(__dirname, '..'), FILE_UPLOAD_DIR);

createDirectory(final_path)
// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, final_path); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for acceptable file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

// Initialize multer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
  fileFilter,
});

module.exports = upload;
