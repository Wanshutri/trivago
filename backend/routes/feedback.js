// routes/feedback.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all feedback
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM feedback');
  res.json(rows);
});

// GET feedback by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM feedback WHERE feedback_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE feedback
router.post('/', async (req, res) => {
  const { reservation_id, guest_id, rating, comments } = req.body;
  const [result] = await pool.query(
    `INSERT INTO feedback (reservation_id, guest_id, rating, comments)
     VALUES (?, ?, ?, ?)`,
    [reservation_id, guest_id, rating, comments]
  );
  res.status(201).json({ feedback_id: result.insertId, ...req.body });
});

// UPDATE feedback
router.put('/:id', async (req, res) => {
  const { reservation_id, guest_id, rating, comments } = req.body;
  await pool.query(
    `UPDATE feedback SET reservation_id=?, guest_id=?, rating=?, comments=?
     WHERE feedback_id=?`,
    [reservation_id, guest_id, rating, comments, req.params.id]
  );
  res.json({ feedback_id: req.params.id, ...req.body });
});

// DELETE feedback
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM feedback WHERE feedback_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
