// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Memastikan variabel dari .env terbaca

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Opsi useNewUrlParser, useUnifiedTopology, useCreateIndex, dan useFindAndModify
      // sudah tidak diperlukan lagi di Mongoose v6+, Mongoose akan menanganinya secara default.
      // Jika Anda menggunakan Mongoose v5 atau lebih lama, Anda mungkin perlu menambahkannya.
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Keluar dari proses dengan kegagalan jika koneksi gagal
  }
};

module.exports = connectDB;