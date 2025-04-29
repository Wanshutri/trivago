// routes/roomTypes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all room types
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM room_types');
  res.json(rows);
});

// GET room type by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM room_types WHERE type_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE room type
router.post('/', async (req, res) => {
  const { type_name, description, capacity, base_price } = req.body;
  const [result] = await pool.query(
    `INSERT INTO room_types (type_name, description, capacity, base_price)
     VALUES (?, ?, ?, ?)`,
    [type_name, description, capacity, base_price]
  );
  res.status(201).json({ type_id: result.insertId, ...req.body });
});

// UPDATE room type
router.put('/:id', async (req, res) => {
  const { type_name, description, capacity, base_price } = req.body;
  await pool.query(
    `UPDATE room_types SET type_name=?, description=?, capacity=?, base_price=?
     WHERE type_id=?`,
    [type_name, description, capacity, base_price, req.params.id]
  );
  res.json({ type_id: req.params.id, ...req.body });
});

// DELETE room type
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM room_types WHERE type_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
