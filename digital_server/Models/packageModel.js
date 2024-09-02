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
const packageSchema = mongoose.Schema({
    packagename: { type: String, required: true },
    description: { type: String, required: true },
    services: { type: [String], required: true },
    packagePrice: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'provider', required: true },
    reviews: [reviewSchema],
},{
    timestamps: true,
  }
);

const package = mongoose.model('package', packageSchema);

module.exports = { package };
