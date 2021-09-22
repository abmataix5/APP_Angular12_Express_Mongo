const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    tipo: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);