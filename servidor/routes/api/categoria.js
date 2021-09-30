var router = require('express').Router();
var mongoose = require('mongoose');

// Modelo de producto, proximamente importaremos los otros para -> populate
const Categoria = require("../../models/categoria");


// GET -> Seleccionar todos los productos

router.get("/", async (req, res) => {

    try {
      const categoria = await Categoria.find();
      console.log(res);
      res.json(categoria);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el GET de productos!!");
    }
});



// GET ONE -> Seleccionamos solo un producto lo haremos seleccionandolo por -> slug

router.get("/:nombre_catego", async (req, res) => {

  try {

    let categoria;
    categoria = await Categoria.findOne({nombre_catego : req.params.nombre_catego}).populate('productos'); // buscamos por slug

    if(categoria){
      res.json(categoria);
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
      let categoria;

      categoria = new Categoria(req.body);
      await categoria.save();
      res.send(categoria);
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Error en crear nuevo producto!!');
  }
});

// DELTE -> Borramos producto, lo buscamos por id y si existe, lo borramos

router.delete("/:id", async (req, res) => {

    try {
      let categoria = await Categoria.findById(req.params.id);

      if(!categoria) {
          res.status(404).json({ msg: 'No existe el producto'})
      }else{

        await Categoria.findOneAndRemove({ _id:req.params.id})

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

    producto = await Categoria.findOneAndUpdate({ _id:req.params.id},producto, { new:true })
    res.json(producto)
    
} catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
}

});

  module.exports = router;