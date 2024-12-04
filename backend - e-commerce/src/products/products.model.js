const { Schema, model, default: mongoose } = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: String,
    color: { type: String },
    rating: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    team: { type: String, required: true }, 
}, { timestamps: true });

const Products = mongoose.model('Product', productSchema);
module.exports = Products;
