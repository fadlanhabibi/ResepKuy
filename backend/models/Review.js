// backend/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  recipeId: { type: String, required: true }, // ID resep dari Spoonacular
  username: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true },
  timestamp: { type: Date, default: Date.now }
});

// Membuat index pada recipeId agar pencarian review berdasarkan recipeId lebih cepat
reviewSchema.index({ recipeId: 1 });

module.exports = mongoose.model('Review', reviewSchema);