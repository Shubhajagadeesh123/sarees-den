const cloudinary = require('./config/cloudinary'); // The config we made earlier
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary local storage

app.post('/api/admin/add-saree', upload.single('image'), async (req, res) => {
  try {
    // 1. Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'sarees_den',
    });

    // 2. The result contains the 'secure_url'. This is what we store in Firestore.
    // Member 3 can then use the Firebase Admin SDK to save the rest of the body
    // (name, price, stock) to the 'sarees' collection.

    res.status(200).json({ message: "Saree added successfully!", url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});