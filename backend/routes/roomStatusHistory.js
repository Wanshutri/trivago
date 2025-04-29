// routes/roomStatusHistory.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all history entries
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM room_status_history');
  res.json(rows);
});

// GET entry by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM room_status_history WHERE history_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE history entry
router.post('/', async (req, res) => {
  const { room_id, old_status, new_status, changed_by } = req.body;
  const [result] = await pool.query(
    `INSERT INTO room_status_history (room_id, old_status, new_status, changed_by)
     VALUES (?, ?, ?, ?)`,
    [room_id, old_status, new_status, changed_by]
  );
  res.status(201).json({ history_id: result.insertId, ...req.body });
});

// UPDATE history entry
router.put('/:id', async (req, res) => {
  const { room_id, old_status, new_status, changed_by } = req.body;
  await pool.query(
    `UPDATE room_status_history SET room_id=?, old_status=?, new_status=?, changed_by=?
     WHERE history_id=?`,
    [room_id, old_status, new_status, changed_by, req.params.id]
  );
  res.json({ history_id: req.params.id, ...req.body });
});

// DELETE history entry
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM room_status_history WHERE history_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
