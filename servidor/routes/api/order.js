var router = require('express').Router();
var mongoose = require('mongoose');

const Producto = require("../../models/producto");
const User = require("../../models/user");
var auth = require('../auth');
const producto = require('../../models/producto');
const Order = require('../../models/order');


router.param("slug", async (req, res, next, slug) => {
// router.param("slug",auth.required ,async (req, res, next, slug) => {

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

router.post("/:slug/buy", auth.required,async (req, res) => {

  try {

      let order = new Order();

      order.user =req.payload.id;
      order.id_producto =req.producto._id;

      await order.save();                                         /* Guardamos la id del producto comprado, y la id del comprador en la tabla de compras */

      await Producto.findOneAndRemove({ _id:req.producto._id})    /* Eliminamos el producto comprado */

      res.json({ msg: 'Producto comprado y eliminado con éxito!' })
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Error en la compra del producto!!');
  }
});



  module.exports = router;