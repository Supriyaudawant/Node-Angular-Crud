// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // require("dotenv").config();

// // const categoryRoutes = require("./routes/categoryRoutes");
// // const productRoutes = require("./routes/productRoutes");

// // const app = express();
// // app.use(cors());
// // app.use(bodyParser.json());

// // // Routes
// // app.use("/api/categories", categoryRoutes);
// // app.use("/api/products", productRoutes);

// // // Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const categoryRoutes = require("./routes/categoryRoutes");
// const productRoutes = require("./routes/productRoutes");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/api/categories", categoryRoutes);
// app.use("/api/products", productRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${3000}`));
// // app.listen(PORT, () => console.log('Connected to MySQL database on port 3306!' + PORT));



// const express = require('express');
// const mysql = require('mysql2');
// const cors = require("cors");
// const categoryRoutes = require("./routes/categoryRoutes"); // Import your routes
// const productRoutes = require("./routes/productRoutes"); // Import your routes
// const app = express();
// app.use(express.json()); // Middleware to parse JSON request body
// app.use(cors()); // Middleware to enable CORS


// //  Register your category routes with the correct base path
// app.use("/api/categories", categoryRoutes);
// app.use("/api/products", productRoutes);

// // Test Route
// app.get("/", (req, res) => {
//   res.json({ message: "Server is running!" });
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });

// // Create MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root@19',
//     database: 'node_angular_crud'
// });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error('❌ MySQL Connection Failed:', err.message);
//         return;
//     }
//     console.log('✅ Connected to MySQL successfully!');
// });

// // Define a simple route
// app.get('/', (req, res) => {
//     res.send('Server is running!');
// });

// app.put('/categories/:id', (req, res) => {
//     const id = req.params.id;
//     const updatedCategory = req.body;
    
//     db.query('UPDATE categories SET name = ? WHERE id = ?', 
//       [updatedCategory.name, id], 
//       (err, result) => {
//         if (err) {
//           res.status(500).send('Database error');
//         } else {
//           res.send({ message: 'Category updated successfully' });
//         }
//       }
//     );
//   });

//   // ✅ Add this POST route
// app.post('/categories', (req, res) => {
//   const category = req.body;
//   categories.push(category);
//   res.status(201).json({ message: 'Category added successfully', category });
// });

  
// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

app.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/categories', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, name });
  });
});

app.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Updated successfully' });
  });
});

app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Deleted successfully' });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
