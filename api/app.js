const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

// Endpoint untuk Sign Up
app.post('/signup', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email is already registered
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'Email sudah terdaftar.' });
    }

    // Insert new user to the database
    const newUser = await pool.query('INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *', [fullname, email, hashedPassword]);

    res.status(201).json({ message: 'Registrasi berhasil.', user: newUser.rows[0] });
  } catch (error) {
    console.error('Error during Sign Up:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat melakukan registrasi.' });
  }
});

// Endpoint untuk Sign In
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user with the provided email
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Email tidak terdaftar.' });
    }

    // Check if the provided password matches the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Password salah.' });
    }

    res.json({ message: 'Sign In berhasil.', user: user.rows[0] });
  } catch (error) {
    console.error('Error during Sign In:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat melakukan Sign In.' });
  }
});

const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
