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
    user_venta:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fecha_compra: {
        type: Date,
        default: Date.now()
    },
    id_producto: {
        type:String
    },
    img:{
        type:String
    },
    nombre_prod :{
        type:String
    },
    precio_prod:{
        type : Number
    },
    rating:{
        type:Number,
        default:0
    }
}, {
    timestamps: true
})



OrderSchema.methods.compraProducto = async function (order) {

    this.user_venta = order.user_venta._id;
    this.user = order.user;
    this.id_producto = order.id_producto;
    this.nombre_prod = order.nombre_prod;
    this.img = order.img;
    this.precio_prod = order.precio;

     await  order.save();  

     return res.send(order);
     
  };

 
  


module.exports = mongoose.model('Order', OrderSchema);