// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Memuat variabel lingkungan dari .env
const connectDB = require('./config/db'); // Fungsi koneksi database kita

// Impor file rute
const recipeRoutes = require('./routes/recipes');
const reviewRoutes = require('./routes/reviews');

const app = express(); // Inisialisasi aplikasi Express

// 1. Koneksi ke Database MongoDB
connectDB();

// 2. Middleware
app.use(cors()); // Mengaktifkan CORS untuk mengizinkan permintaan dari domain lain (frontend kita nanti)
app.use(express.json()); // Middleware untuk mem-parsing body request dalam format JSON (penting untuk POST request)

// 3. Definisi Rute Utama
// Rute tes sederhana
app.get('/', (req, res) => {
  res.send('Selamat Datang di API Aplikasi Resep Makanan!');
});

// Gunakan rute yang sudah kita buat
// Semua rute di recipeRoutes akan diawali dengan /api/recipes
app.use('/api/recipes', recipeRoutes);
// Semua rute di reviewRoutes akan diawali dengan /api/reviews
app.use('/api/reviews', reviewRoutes);

// 4. Jalankan Server
const PORT = process.env.PORT || 5001; // Gunakan port dari .env, atau 5001 jika tidak ada

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
  // Pesan MongoDB Connected... akan muncul dari connectDB() jika berhasil
});