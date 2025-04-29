// routes/specialRequests.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all special requests
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM special_requests');
  res.json(rows);
});

// GET request by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM special_requests WHERE request_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE request
router.post('/', async (req, res) => {
  const { reservation_id, guest_id, request_text, status } = req.body;
  const [result] = await pool.query(
    `INSERT INTO special_requests (reservation_id, guest_id, request_text, status)
     VALUES (?, ?, ?, ?)`,
    [reservation_id, guest_id, request_text, status]
  );
  res.status(201).json({ request_id: result.insertId, ...req.body });
});

// UPDATE request
router.put('/:id', async (req, res) => {
  const { reservation_id, guest_id, request_text, status } = req.body;
  await pool.query(
    `UPDATE special_requests SET reservation_id=?, guest_id=?, request_text=?, status=?
     WHERE request_id=?`,
    [reservation_id, guest_id, request_text, status, req.params.id]
  );
  res.json({ request_id: req.params.id, ...req.body });
});

// DELETE request
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM special_requests WHERE request_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
