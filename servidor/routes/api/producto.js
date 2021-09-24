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



// GET ONE -> Seleccionamos solo un producto lo haremos seleccionandolo por -> slug

router.get("/:slug", async (req, res) => {

  try {

    let producto;
    producto = await Producto.findOne({slug : req.params.slug}); // buscamos por slug

    if(producto){
      res.json(producto);
    }else{
      res.status(500).send("No existe el producto con ese slug!!");
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el GET de producto!!");
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