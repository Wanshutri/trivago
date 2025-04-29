// routes/reservations.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all reservations
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM reservations');
  res.json(rows);
});

// GET reservation by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM reservations WHERE reservation_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE reservation
router.post('/', async (req, res) => {
  const { guest_id, room_id, check_in_date, check_out_date, status } = req.body;
  const [result] = await pool.query(
    `INSERT INTO reservations (guest_id, room_id, check_in_date, check_out_date, status)
     VALUES (?, ?, ?, ?, ?)`,
    [guest_id, room_id, check_in_date, check_out_date, status]
  );
  res.status(201).json({ reservation_id: result.insertId, ...req.body });
});

// UPDATE reservation
router.put('/:id', async (req, res) => {
  const { guest_id, room_id, check_in_date, check_out_date, status } = req.body;
  await pool.query(
    `UPDATE reservations SET guest_id=?, room_id=?, check_in_date=?, check_out_date=?, status=?
     WHERE reservation_id=?`,
    [guest_id, room_id, check_in_date, check_out_date, status, req.params.id]
  );
  res.json({ reservation_id: req.params.id, ...req.body });
});

// DELETE reservation
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM reservations WHERE reservation_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
