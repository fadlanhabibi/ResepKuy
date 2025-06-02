// backend/routes/recipes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController'); // Mengimpor controller resep

// Rute untuk mencari resep
// GET /api/recipes/search?query=ayam&cuisine=indonesian
router.get('/search', recipeController.searchRecipes);

// Rute untuk mencari resep berdasarkan bahan
// GET /api/recipes/findByIngredients?ingredients=telur,tepung
router.get('/findByIngredients', recipeController.findRecipesByIngredients);

// Rute untuk mendapatkan detail resep berdasarkan ID
// GET /api/recipes/12345 (contoh ID resep)
router.get('/:id', recipeController.getRecipeDetails);

module.exports = router;