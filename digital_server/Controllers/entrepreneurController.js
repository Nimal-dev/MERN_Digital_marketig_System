const productModels = require("../Models/productModel");
const { Order } = require('../Models/orderModel');
const { Product } = require('../Models/productModel');


const multer = require("multer");
const path = require("path");
const ProductModel = productModels.product;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('image');

exports.addProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file', details: err });
    }

    try {
      const { name, description, price } = req.body;
      const entrepreneurId =  req.body.entrepreneurId;

      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      const imageUrl = `/uploads/${req.file.filename}`;

      const productParam = {
        name,
        description,
        price,
        imageUrl,
        entrepreneurId
      };

      await ProductModel.create(productParam);
      res.json({ message: 'Product added successfully' });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

// Function to view products for a specific seller
exports.viewProducts = async (req, res) => {
  try {
    const { entrepreneurId } = req.query;
    const products = await ProductModel.find({ entrepreneurId }).populate('entrepreneurId');
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.query; // Accessing query parameter

    if (!productId) {
      return res.status(400).json({ error: 'Package ID is required' });
    }

    const productDetails = await ProductModel.findById(productId).populate('entrepreneurId');
    
    if (!productDetails) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json(productDetails);
  } catch (error) {
    console.error("Error fetching package details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.query; // Accessing query parameter

    if (!productId) {
      return res.status(400).json({ error: 'Package ID is required' });
    }

    const productDetails = await ProductModel.findById(productId).populate('entrepreneurId');
    
    if (!productDetails) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json(productDetails);
  } catch (error) {
    console.error("Error fetching package details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.viewProductss = async (req, res) => {
  try {
    
    const products = await ProductModel.find().populate('entrepreneurId');
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await ProductModel.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Function to update a product
exports.updateProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file', details: err });
    }

    try {
      const { id, name, description, price } = req.body;

      let updateFields = {
        name,
        description,
        price,
      };

      if (req.file) {
        const imageUrl = `/uploads/${req.file.filename}`;
        updateFields.imageUrl = imageUrl;
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};



// exports.viewProduct = async (req, res) => {
//   try {
//     const products = await ProductModel.find(); // Fetch all products
//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


exports.getEntrepreneurOrders = async (req, res) => {
  const { entrepreneurId } = req.params;

  try {
    // Find products added by the entrepreneur
    const products = await Product.find({ entrepreneurId });

    // Extract product IDs
    const productIds = products.map(product => product._id);

    // Find orders containing these products
    const orders = await Order.find({ "items.productId": { $in: productIds } }).populate('items.productId').populate('userId');

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};