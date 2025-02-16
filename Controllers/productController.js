const Product = require("../Backend/Models/productModel");

exports.getProductsByPage = async (req, res) => {
  const { page, pageSize } = req.query;
  try {
    const products = await Product.getProductsByPage(parseInt(page), parseInt(pageSize));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
