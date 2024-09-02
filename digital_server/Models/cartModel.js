const mongoose = require('mongoose');


const CartItemSchema = mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'package' },
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

const CartSchema =  mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  payment: { type: Number, default: 0 },
  items: [CartItemSchema],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart, CartItem };
