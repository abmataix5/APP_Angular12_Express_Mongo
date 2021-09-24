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

// DELTE -> Borramos producto, lo buscamos por id y si existe, lo borramos

router.delete("/:id", async (req, res) => {

    try {
      let producto = await Producto.findById(req.params.id);

      if(!producto) {
          res.status(404).json({ msg: 'No existe el producto'})
      }else{

        await Producto.findOneAndRemove({ _id:req.params.id})

        res.json({ msg: 'Producto eliminado con éxito!' })
      }

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al borrar el producto');
    }

 });


 // PUT -> Actualizamos producto, lo buscamos por id, y si existe, se actualiza 

 router.put("/:id", async (req, res) => {

  try {
    const {nombre,tipo,marca,modelo,estado,precio,descripcion,imagen,ubicacion} = req.body;
    let producto = await Producto.findById(req.params.id);

    if(!producto) {
        res.status(404).json({ msg: 'No existe el producto'})
    }

    producto.nombre = nombre;
    producto.tipo = tipo;
    producto.marca = marca;
    producto.modelo = modelo;
    producto.estado = estado;
    producto.precio = precio;
    producto.descripcion = descripcion;
    producto.imagen = imagen;
    producto.ubicacion = ubicacion;

    producto = await Producto.findOneAndUpdate({ _id:req.params.id},producto, { new:true })
    res.json(producto)
    
} catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
}

});

  module.exports = router;