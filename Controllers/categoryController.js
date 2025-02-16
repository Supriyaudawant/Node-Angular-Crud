// const Category = require("../../models/categoryModel");

// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.getAllCategories();
//     res.status(200).json(categories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const Category = require("../Backend/Models/categoryModel");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message); // Logs in VS Code Terminal
    res.status(500).json({ error: error.message }); // Sends error message in response
  }
};

// exports.createCategory = async (req, res) => {
//   try {
//     console.log("Received Data:", req.body);
//     const { name } = req.body;
//     await Category.createCategory(name);
//     res.status(201).json({ message: "Category created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.createCategory = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    const { name } = req.body;
    if (!name) {
      console.error("Validation Error: Name is missing");
      return res.status(400).json({ error: "Category name is required" });
    }

    await Category.createCategory(name);
    console.log("Category Inserted Successfully");
    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Database Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Category.updateCategory(id, name);
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.deleteCategory(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
