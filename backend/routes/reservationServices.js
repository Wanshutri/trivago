// routes/reservationServices.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all reservation-services
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM reservation_services');
  res.json(rows);
});

// GET by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM reservation_services WHERE id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE
router.post('/', async (req, res) => {
  const { reservation_id, service_id, quantity } = req.body;
  const [result] = await pool.query(
    `INSERT INTO reservation_services (reservation_id, service_id, quantity)
     VALUES (?, ?, ?)`,
    [reservation_id, service_id, quantity]
  );
  res.status(201).json({ id: result.insertId, ...req.body });
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { reservation_id, service_id, quantity } = req.body;
  await pool.query(
    `UPDATE reservation_services SET reservation_id=?, service_id=?, quantity=?
     WHERE id=?`,
    [reservation_id, service_id, quantity, req.params.id]
  );
  res.json({ id: req.params.id, ...req.body });
});

// DELETE
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM reservation_services WHERE id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
