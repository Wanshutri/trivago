// routes/rooms.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all rooms
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM rooms');
  res.json(rows);
});

// GET room by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM rooms WHERE room_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE room
router.post('/', async (req, res) => {
  const { room_number, type_id, current_status, description } = req.body;
  const [result] = await pool.query(
    `INSERT INTO rooms (room_number, type_id, current_status, description)
     VALUES (?, ?, ?, ?)`,
    [room_number, type_id, current_status, description]
  );
  res.status(201).json({ room_id: result.insertId, ...req.body });
});

// UPDATE room
router.put('/:id', async (req, res) => {
  const { room_number, type_id, current_status, description } = req.body;
  await pool.query(
    `UPDATE rooms SET room_number=?, type_id=?, current_status=?, description=?
     WHERE room_id=?`,
    [room_number, type_id, current_status, description, req.params.id]
  );
  res.json({ room_id: req.params.id, ...req.body });
});

// DELETE room
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM rooms WHERE room_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
