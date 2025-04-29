// routes/users.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all users
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users');
  res.json(rows);
});

// GET user by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE user
router.post('/', async (req, res) => {
  const { username, password_hash, role_id, full_name, email, phone, address } = req.body;
  const [result] = await pool.query(
    `INSERT INTO users (username, password_hash, role_id, full_name, email, phone, address)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [username, password_hash, role_id, full_name, email, phone, address]
  );
  res.status(201).json({ user_id: result.insertId, ...req.body });
});

// UPDATE user
router.put('/:id', async (req, res) => {
  const { username, password_hash, role_id, full_name, email, phone, address } = req.body;
  await pool.query(
    `UPDATE users SET username=?, password_hash=?, role_id=?, full_name=?, email=?, phone=?, address=?
     WHERE user_id=?`,
    [username, password_hash, role_id, full_name, email, phone, address, req.params.id]
  );
  res.json({ user_id: req.params.id, ...req.body });
});

// DELETE user
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
