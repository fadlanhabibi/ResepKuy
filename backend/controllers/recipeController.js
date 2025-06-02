// backend/controllers/recipeController.js
const axios = require('axios');
require('dotenv').config(); // Memastikan variabel dari .env terbaca

const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = process.env.SPOONACULAR_API_KEY;

// Fungsi untuk mencari resep berdasarkan query dan filter
exports.searchRecipes = async (req, res) => {
  // Ambil parameter query dari request (misal: /api/recipes/search?query=pasta&cuisine=italian)
  const { query, cuisine, diet, maxCalories, maxReadyTime, number } = req.query;

  try {
    const params = {
      apiKey: API_KEY,
      query: query,
      number: number || 20, // Jumlah hasil, default 20 jika tidak ditentukan
      addRecipeInformation: true, // Untuk mendapatkan informasi dasar resep
    };

    // Tambahkan filter jika ada
    if (cuisine) params.cuisine = cuisine;
    if (diet) params.diet = diet;
    if (maxCalories) params.maxCalories = maxCalories;
    if (maxReadyTime) params.maxReadyTime = maxReadyTime;

    const response = await axios.get(`${SPOONACULAR_BASE_URL}/complexSearch`, { params });
    res.json(response.data.results); // Spoonacular mengembalikan hasil dalam array 'results'
  } catch (error) {
    console.error('Error searching recipes:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching recipes from Spoonacular', error: error.message });
  }
};

// Fungsi untuk mendapatkan detail resep berdasarkan ID
exports.getRecipeDetails = async (req, res) => {
  const { id } = req.params;

  // PERBAIKAN DI SINI: Gunakan template literal yang benar tanpa HTML atau escape yang salah
  const constructedUrl = `${SPOONACULAR_BASE_URL}/${id}/information`;

  console.log('----------------------------------------------------');
  console.log('[Backend Log] Attempting to fetch URL for recipe details:');
  console.log('Constructed URL:', constructedUrl); // Ini sekarang seharusnya menampilkan URL yang benar
  console.log('Recipe ID:', id);
  console.log('SPOONACULAR_BASE_URL:', SPOONACULAR_BASE_URL);
  console.log('API Key being used (first 5 chars):', API_KEY ? API_KEY.substring(0, 5) + '...' : 'API KEY NOT FOUND/UNDEFINED');
  console.log('----------------------------------------------------');

  try {
    const response = await axios.get(constructedUrl, {
      params: { apiKey: API_KEY, includeNutrition: true }
    });
    res.json(response.data);
  } catch (error) {
    console.error('------------------- ERROR DETAILS --------------------');
    console.error(`Error fetching recipe details for ID ${id}:`);
    if (error.isAxiosError) {
        console.error('Axios error config URL:', error.config.url);
        console.error('Axios error message:', error.message);
        console.error('Axios error response:', error.response ? error.response.data : 'No response data');
    } else {
        console.error('Non-Axios error:', error.message);
    }
    console.error('----------------------------------------------------');
    res.status(500).json({ message: 'Error fetching recipe details from server', error: error.message });
  }
};

// Fungsi untuk mencari resep berdasarkan bahan-bahan yang dimiliki
exports.findRecipesByIngredients = async (req, res) => {
  const { ingredients, number } = req.query;

  if (!ingredients) {
    return res.status(400).json({ message: "Parameter 'ingredients' dibutuhkan." });
  }

  try {
    const params = {
      apiKey: API_KEY,
      ingredients: ingredients,
      number: number || 10,
      ranking: 1,
    };
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/findByIngredients`, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error finding recipes by ingredients:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error finding recipes by ingredients', error: error.message });
  }
};