const mongoose = require('mongoose');
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");
const User = require("./user");
const Producto = require("./producto");


const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fecha_compra: {
        type: Date
    },
    id_producto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Producto'
    }
}, {
    timestamps: true
})




module.exports = mongoose.model('Order', OrderSchema);