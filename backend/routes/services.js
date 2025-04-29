// routes/services.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all services
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM services');
  res.json(rows);
});

// GET service by id
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM services WHERE service_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// CREATE service
router.post('/', async (req, res) => {
  const { service_name, description, price } = req.body;
  const [result] = await pool.query(
    `INSERT INTO services (service_name, description, price)
     VALUES (?, ?, ?)`,
    [service_name, description, price]
  );
  res.status(201).json({ service_id: result.insertId, ...req.body });
});

// UPDATE service
router.put('/:id', async (req, res) => {
  const { service_name, description, price } = req.body;
  await pool.query(
    `UPDATE services SET service_name=?, description=?, price=?
     WHERE service_id=?`,
    [service_name, description, price, req.params.id]
  );
  res.json({ service_id: req.params.id, ...req.body });
});

// DELETE service
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM services WHERE service_id = ?', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
