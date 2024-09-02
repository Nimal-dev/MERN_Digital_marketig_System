const { Cart, CartItem } = require('../Models/cartModel');
const { Order } = require('../Models/orderModel');
const productModels = require("../Models/productModel");
const packageModels = require("../Models/packageModel");
const package = require('../Models/packageModel');
const Razorpay = require('razorpay');
const crypto = require('crypto');


const ProductModel = productModels.product;
const PackageModel = packageModels.package;
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });


exports.addToCart = async (req, res) => {
  const { customerId, productId, packageId } = req.body;
  try {
    let cart = await Cart.findOne({ userId: customerId });
    if (!cart) {
      cart = new Cart({ userId: customerId, items: [] });
    }

    if (productId) {
      const itemExists = cart.items.some(item => item.productId && item.productId.toString() === productId);
      if (!itemExists) {
        cart.items.push(new CartItem({ productId }));
      } else {
        return res.json({ success: false, message: 'Product already in cart' });
      }
    } else if (packageId) {
      const itemExists = cart.items.some(item => item.packageId && item.packageId.toString() === packageId);
      if (!itemExists) {
        cart.items.push(new CartItem({ packageId }));
      } else {
        return res.json({ success: false, message: 'Package already in cart' });
      }
    } else {
      return res.json({ success: false, message: 'No product or package specified' });
    }

    await cart.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.json({ success: false, message: 'Error adding item to cart' });
  }
};

exports.getCart = async (req, res) => {
  const { customerId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: customerId })
      .populate('items.productId')
      .populate('items.packageId');

    if (!cart) {
      return res.json({ items: [] });
    }

    const items = cart.items.map(item => {
      return {
        productId: item.productId || null,
        packageId: item.packageId || null,
        // Include any additional fields you need from the item
        ...item.toObject(), // Convert to plain object
      };
    }).filter(item => item.productId || item.packageId); // Filter out empty items

    res.json({ items });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.json({ items: [] });
  }
};


exports.updatePaymentStatus = async (req, res) => {
  const { customerId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: customerId });
    if (cart) {
      // Move items from cart to order
      const orderItems = cart.items.map(item => {
        if (item.productId) {
          return {
            productId: item.productId._id,
            quantity: 1, // Adjust quantity if needed
            price: item.productId.price,
          };
        } else if (item.packageId) {
          return {
            packageId: item.packageId._id,
            quantity: 1, // Adjust quantity if needed
            price: item.packageId.packagePrice,
          };
        }
        return null;
      }).filter(item => item);

      const total = orderItems.reduce((acc, item) => acc + item.price, 0);

      const newOrder = new Order({
        userId: customerId,
        items: orderItems,
        total,
        address: req.body.address, // Ensure address is sent in request body
      });

      await newOrder.save();

      // Clear cart items after order is placed
      cart.items = [];
      cart.payment = 1;
      await cart.save();

      res.status(200).json({ success: true, message: 'Payment status updated and order placed successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.removeFromCart = async (req, res) => {
  const { customerId, itemId, isPackage } = req.params;

  try {
    const cart = await Cart.findOne({ userId: customerId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Use a more robust filter to avoid undefined errors
    cart.items = cart.items.filter(item => {
      if (isPackage) {
        return item.packageId && item.packageId.toString() !== itemId;
      } else {
        return item.productId && item.productId.toString() !== itemId;
      }
    });

    await cart.save();

    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ success: false, message: 'Error removing item from cart' });
  }
};







// -----------------Placing Order--------------------------//
exports.placeOrder = async (req, res) => {
  const { customerId, address } = req.body;

  try {
    const cart = await Cart.findOne({ userId: customerId }).populate('items.productId').populate('items.packageId');
    console.log('Fetched cart:', cart);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => {
      if (item.productId) {
        return {
          productId: item.productId,
          price: item.productId.price,
        };
      } else if (item.packageId) {
        return {
          packageId: item.packageId,
          price: item.packageId.packagePrice,
        };
      }
      return null;
    }).filter(item => item);

    const total = orderItems.reduce((acc, item) => acc + item.price, 0);

    const newOrder = new Order({userId: customerId,items: orderItems,total,address,});

    await newOrder.save();

    console.log('Cart items before clearing:', cart.items);
    cart.items = [];
    await cart.save();
    console.log('Cart items after clearing:', cart.items);

    res.json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Error placing order' });
  }
};



exports.getOrders = async (req, res) => {
  const { customerId } = req.params;
  console.log('Fetching orders for customerId:', customerId); // Logging customerId

  try {
    const orders = await Order.find({ userId: customerId }).populate('items.productId').populate('items.packageId');
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

exports.getOrdersByProvider = async (req, res) => {
  try {
    
    // const providerId = req.body.providerId;
    const orders = await Order.find()
    .populate("userId")
      .populate({
        path: 'items.packageId',
        populate: { path: 'providerId' }
      });

    console.log(`Fetched orders: ${orders.length}`);
    
    if (orders.length === 0) {
      console.log(`No orders found for providerId: ${providerId}`);
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching orders' });
  }
};
exports.getOrdersBySeller = async (req, res) => {
  try {
    
    
    const orders = await Order.find()
    .populate("userId")
      .populate({
        path: 'items.productId',
        populate: { path: 'entrepreneurId' }
      });

    console.log(`Fetched orders: ${orders.length}`);
    
    if (orders.length === 0) {
      console.log(`No orders found for providerId: ${providerId}`);
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching orders' });
  }
};
exports.verify = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const hmac = crypto.createHmac('sha256', process.env.KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = hmac.digest('hex');

    if (expectedSignature === razorpay_signature) {
      const { customerId, address } = req.body;

      const cart = await Cart.findOne({ userId: customerId }).populate('items.productId').populate('items.packageId');
      console.log('Fetched cart:', cart);

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
      }

      const orderItems = cart.items.map(item => {
        if (item.productId) {
          return {
            productId: item.productId._id,
            quantity: 1, // Adjust quantity if needed
            price: item.productId.price,
          };
        } else if (item.packageId) {
          return {
            packageId: item.packageId._id,
            quantity: 1, // Adjust quantity if needed
            price: item.packageId.packagePrice,
          };
        }
        return null;
      }).filter(item => item);

      const total = orderItems.reduce((acc, item) => acc + item.price, 0);

      const newOrder = new Order({
        userId: customerId,
        items: orderItems,
        total,
        address,
      });
      
      await newOrder.save();
      
      // Clear cart items after order is placed
      cart.items = [];
      cart.payment = 1;
      await cart.save();
      
      res.status(200).json({ success: true, message: 'Payment verified and order placed successfully' });
    } else {
      res.status(400).json({ status: 'failure', message: 'Invalid signature sent!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: "Internal server error!" });
  }
};


// ---------------Product Review Controller--------------//

exports.addReview = async (req, res) => {
  const { productId, customerId, reviewText, rating } = req.body;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    product.reviews.push({ customerId, reviewText, rating });
    await product.save();
    res.json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Error adding review' });
  }
};

exports.getReviews = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await ProductModel.findById(productId).populate('reviews.customerId');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, reviews: product.reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
};



// ---------------Package Review Controller--------------//
exports.addPackageReview = async (req, res) => {
  const { packageId, customerId, reviewText, rating } = req.body;
  try {
    const package = await PackageModel.findById(packageId);
    if (!package) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    package.reviews.push({ customerId, reviewText, rating });
    await package.save();
    res.json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Error adding review' });
  }
};

exports.getPackageReviews = async (req, res) => {
  const { packageId } = req.params;
  try {
    const package = await PackageModel.findById(packageId).populate('reviews.customerId');
    if (!package) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, reviews: package.reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
};