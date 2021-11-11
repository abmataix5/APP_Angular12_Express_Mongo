var router = require('express').Router();
var mongoose = require('mongoose');

// Modelo de imagen, proximamente importaremos los otros para -> populate
const Imagen = require("../../models/imagen");


// GET -> Seleccionar todos las imagenes

router.get("/", async (req, res) => {

    try {
      const imagen = await Imagen.find();

      res.json(imagen);
    } catch (error) {
    
      res.status(500).send("Error en el GET de imagenes!!");
    }
});



// GET ONE -> Seleccionamos solo una imagen lo haremos seleccionandolo por -> slug

router.get("/:slug", async (req, res) => {

  try {

    let imagen;
    imagen = await Imagen.findOne({slug : req.params.slug}); // buscamos por slug

    if(imagen){
      res.json(imagen);
    }else{
      res.status(500).send("No existe imagen con ese slug!!");
    }
  
  } catch (error) {
 
    res.status(500).send("Error en el GET de imagenes!!");
  }
});

//POST -> Crear nuevo producto

router.post("/", async (req, res) => {

  try {
      let imagen;

      imagen = new Imagen(req.body);
      await imagen.save();
      res.send(imagen);
      
  } catch (error) {
     
      res.status(500).send('Error en crear nueva imagen!!');
  }
});

// DELTE -> Borramos imagen, lo buscamos por id y si existe, lo borramos

router.delete("/:id", async (req, res) => {

    try {
      let imagen = await Imagen.findById(req.params.id);

      if(!imagen) {
          res.status(404).json({ msg: 'No existe la imagen'})
      }else{

        await Imagen.findOneAndRemove({ _id:req.params.id})

        res.json({ msg: 'Imagen eliminada con éxito!' })
      }

    } catch (error) {
      
        res.status(500).send('Error al borrar la imagen');
    }

 });




  module.exports = router;