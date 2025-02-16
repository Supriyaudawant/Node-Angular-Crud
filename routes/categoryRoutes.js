const express = require('express');
const router = express.Router();
// const db = require('../db');


const categoryController = require('../controllers/categoryController'); 
router.get('/', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, result) => {
    if (err) throw err;
    res.status(201).send('Category added');
  });
});

router.put('/:id', (req, res) => {
  const { name } = req.body;
  db.query('UPDATE categories SET name = ? WHERE id = ?', [name, req.params.id], (err) => {
    if (err) throw err;
    res.send('Category updated');
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM categories WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.send('Category deleted');
  });
});

module.exports = router;
