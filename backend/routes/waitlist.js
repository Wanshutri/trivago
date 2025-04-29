// routes/waitlist.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all waitlist entries
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM waitlist');
  res.json(rows);
});

// GET entry by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM waitlist WHERE waitlist_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE entry
router.post('/', async (req, res) => {
  const { guest_id, requested_check_in, requested_check_out, notified } = req.body;
  const [result] = await pool.query(
    `INSERT INTO waitlist (guest_id, requested_check_in, requested_check_out, notified)
     VALUES (?, ?, ?, ?)`,
    [guest_id, requested_check_in, requested_check_out, notified]
  );
  res.status(201).json({ waitlist_id: result.insertId, ...req.body });
});

// UPDATE entry
router.put('/:id', async (req, res) => {
  const { guest_id, requested_check_in, requested_check_out, notified } = req.body;
  await pool.query(
    `UPDATE waitlist SET guest_id=?, requested_check_in=?, requested_check_out=?, notified=?
     WHERE waitlist_id=?`,
    [guest_id, requested_check_in, requested_check_out, notified, req.params.id]
  );
  res.json({ waitlist_id: req.params.id, ...req.body });
});

// DELETE entry
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM waitlist WHERE waitlist_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
