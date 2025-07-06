const multer = require("multer");
const path = require("path");

// Store file in memory temporarily
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".mp4") {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png, and mp4 files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
