const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  entrepreneurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'entrepreneur',
    required: true,
  },
  reviews: [reviewSchema],
}, {
  timestamps: true,
});

const product = mongoose.model("Product", productSchema);

module.exports = { product };









// const mongoose = require('mongoose');

// const productSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   imageUrl: {
//     type: String,
//     required: true,
//   },
 

 
//   entrepreneurId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'entrepreneur',
//     required: true,
//   },
// }, {
//   timestamps: true,
// });



// const product = mongoose.model("Product", productSchema);

// module.exports = {product};
