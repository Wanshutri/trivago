// routes/payments.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all payments
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM payments');
  res.json(rows);
});

// GET payment by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM payments WHERE payment_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE payment
router.post('/', async (req, res) => {
  const { reservation_id, amount, payment_method, status, paid_at } = req.body;
  const [result] = await pool.query(
    `INSERT INTO payments (reservation_id, amount, payment_method, status, paid_at)
     VALUES (?, ?, ?, ?, ?)`,
    [reservation_id, amount, payment_method, status, paid_at]
  );
  res.status(201).json({ payment_id: result.insertId, ...req.body });
});

// UPDATE payment
router.put('/:id', async (req, res) => {
  const { reservation_id, amount, payment_method, status, paid_at } = req.body;
  await pool.query(
    `UPDATE payments SET reservation_id=?, amount=?, payment_method=?, status=?, paid_at=?
     WHERE payment_id=?`,
    [reservation_id, amount, payment_method, status, paid_at, req.params.id]
  );
  res.json({ payment_id: req.params.id, ...req.body });
});

// DELETE payment
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM payments WHERE payment_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
