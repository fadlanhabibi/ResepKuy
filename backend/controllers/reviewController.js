// backend/controllers/reviewController.js
const Review = require('../models/Review'); // Mengimpor model Review yang sudah kita buat

// Fungsi untuk mendapatkan semua review berdasarkan ID resep
exports.getReviewsByRecipeId = async (req, res) => {
  try {
    // Cari semua review di database yang memiliki recipeId yang sesuai dengan parameter di URL
    // Urutkan berdasarkan timestamp terbaru (descending)
    const reviews = await Review.find({ recipeId: req.params.recipeId }).sort({ timestamp: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data review dari server.', error: error.message });
  }
};

// Fungsi untuk menambah review baru untuk sebuah resep
exports.addReview = async (req, res) => {
  const { recipeId } = req.params; // Ambil recipeId dari parameter URL
  const { username, rating, comment } = req.body; // Ambil data review dari body request

  // Validasi dasar
  if (!username || !rating || !comment) {
    return res.status(400).json({ message: 'Nama pengguna, rating, dan komentar tidak boleh kosong.' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating harus antara 1 dan 5.' });
  }

  try {
    // Buat instance Review baru dengan data yang diterima
    const newReview = new Review({
      recipeId,
      username,
      rating,
      comment
    });

    // Simpan review baru ke database
    const savedReview = await newReview.save();
    res.status(201).json(savedReview); // Kirim respons status 201 (Created) beserta data review yang disimpan
  } catch (error) {
    console.error('Error adding review:', error.message);
    res.status(500).json({ message: 'Gagal menambahkan review ke server.', error: error.message });
  }
};