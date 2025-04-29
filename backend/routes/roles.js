const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all roles
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM roles');
  res.json(rows);
});

// GET role by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM roles WHERE role_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE role
router.post('/', async (req, res) => {
  const { role_name } = req.body;
  const [result] = await pool.query('INSERT INTO roles (role_name) VALUES (?)', [role_name]);
  res.status(201).json({ role_id: result.insertId, role_name });
});

// UPDATE role
router.put('/:id', async (req, res) => {
  const { role_name } = req.body;
  await pool.query('UPDATE roles SET role_name = ? WHERE role_id = ?', [role_name, req.params.id]);
  res.json({ role_id: req.params.id, role_name });
});

// DELETE role
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM roles WHERE role_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
