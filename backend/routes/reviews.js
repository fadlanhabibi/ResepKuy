// backend/routes/reviews.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); // Mengimpor controller review

// Rute untuk mendapatkan review berdasarkan ID resep
// GET /api/reviews/12345 (ID resep)
router.get('/:recipeId', reviewController.getReviewsByRecipeId);

// Rute untuk menambahkan review baru untuk sebuah resep
// POST /api/reviews/12345 (ID resep)
router.post('/:recipeId', reviewController.addReview);

module.exports = router;