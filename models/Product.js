const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        requiere: [ true, "can't be blank" ]
    },
    description: {
        type: String,
        requiere: [ true, "can't be blank" ]
    },
    price: {
        type: String,
        requiere: [ true, "can't be blank" ]
    },
    category: {
        type: String,
        requiere: [ true, "can't be blank" ]
    },
    amount: {
        type: Number,
        default: 0,
        requiere: [ true, "can't be blank" ]
    },
    pictures: {
        type: Array,
        requiere: true
    },
},
{
    minimize: false
}
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;