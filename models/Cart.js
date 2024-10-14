const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến bảng Users 
        required: true
    },
    products: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product', // Tham chiếu đến bảng Products
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cart', cartSchema);
