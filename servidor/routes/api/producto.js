var router = require('express').Router();
var mongoose = require('mongoose');

// Modelo de producto, proximamente importaremos los otros para -> populate
const Producto = require("../../models/producto");


// GET -> Seleccionar todos los productos

router.get("/", async (req, res) => {

    try {
      const products = await Producto.find();
      console.log(res);
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el GET de productos!!");
    }
});

//POST -> Crear nuevo producto

router.post("/", async (req, res) => {

  try {
      let producto;

      producto = new Producto(req.body);
      await producto.save();
      res.send(producto);
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Error en crear nuevo producto!!');
  }
});



  module.exports = router;