const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private (admin/employee)
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Return the path relative to the server so the frontend can append it to the base URL
  // e.g. /uploads/image-1698765432123.jpg
  const imagePath = `/uploads/${req.file.filename}`;
  
  res.status(200).json({
    message: 'Image uploaded successfully',
    url: imagePath
  });
});

module.exports = router;
