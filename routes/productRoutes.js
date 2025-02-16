const express = require('express');
const router = express.Router();
// const db = require('../db');
const categoryController = require('../controllers/productController'); 
router.get('/', (req, res) => {
  const { page, size } = req.query;
  const offset = (page - 1) * size;
  db.query(
    `SELECT products.id, products.name, categories.name as categoryName, products.categoryId 
     FROM products INNER JOIN categories ON products.categoryId = categories.id 
     LIMIT ?, ?`,
    [parseInt(offset), parseInt(size)],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

router.post('/', (req, res) => {
  const { name, categoryId } = req.body;
  db.query('INSERT INTO products (name, categoryId) VALUES (?, ?)', [name, categoryId], (err) => {
    if (err) throw err;
    res.status(201).send('Product added');
  });
});

router.put('/:id', (req, res) => {
  const { name, categoryId } = req.body;
  db.query('UPDATE products SET name = ?, categoryId = ? WHERE id = ?', [name, categoryId, req.params.id], (err) => {
    if (err) throw err;
    res.send('Product updated');
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.send('Product deleted');
  });
});

module.exports = router;
