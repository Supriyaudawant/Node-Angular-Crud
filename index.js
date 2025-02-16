const express = require("express");
const app = express();
// const port = 3306;
const cors = require("cors");

app.use(express.json()); // Ensure JSON body parsing
app.use(cors()); // Handle CORS issues

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});


// Routes
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
