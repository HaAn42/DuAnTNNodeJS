const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name_pr: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    price: { type: Number, required: true },
    color: { type: String },
    size: { type: String },
    capacity: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

productSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
