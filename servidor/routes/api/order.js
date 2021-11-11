var router = require('express').Router();
var mongoose = require('mongoose');

const Producto = require("../../models/producto");
const User = require("../../models/user");
var auth = require('../auth');
const producto = require('../../models/producto');
const Order = require('../../models/order');


router.param("slug", async (req, res, next, slug) => {


  await Producto.findOne({ slug: slug })
    .populate('author')
    .then(function (producto) {
      if (!producto) {
        return res.sendStatus(404);
      }
      req.producto = producto;
      return next();
    })
    .catch(next);
});


//POST -> Crear nueva compra

router.post("/:slug/buy", auth.required, async (req, res) => {

  try {

      let order = new Order();

      order.user =req.payload.id;
      order.id_producto =req.producto._id;
      order.user_venta = req.producto.author._id;
      order.nombre_prod = req.producto.nombre;
      order.img = req.producto.imagen;
      order.precio = req.producto.precio;
  
      if(String(req.payload.id )== String(req.producto.author._id)){             /* Si no lo convierto a String, no me deja compararlos */
        res.status(500).send('No puedes comprar tu propio producto!!!');         /* Comparo el comprador con el vendedor, para que no puedas comprar tu prods */
      }else{
        res.json({ result: order.compraProducto(order) });                        /* Insertamos datos en compras y borramos el producto comprado */
        await Producto.findOneAndRemove({ _id:req.producto._id}) 
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Error en la compra del producto!!');
  }

});


/* Obtenemos los productos comprados por el usuario activo */

router.get("/", auth.required, async function (req, res) {


   try {

       await Order.find({ user: req.payload.id })
                  .populate("id_producto")
                  .then(function (orders) {

                      if (orders) {
                        console.log(orders);
                        return res.json(orders); 
                        
                      }else{
                        console.log('Este user no ha comprado');
                      }
        
        }); 
   
  } catch (error) {
    res.status(500).send("Error");
  } 
});



  module.exports = router;