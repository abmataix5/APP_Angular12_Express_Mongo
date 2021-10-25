var router = require('express').Router();
var mongoose = require('mongoose');

// Modelo de producto, proximamente importaremos los otros para -> populate
const Producto = require("../../models/producto");


router.get("/", async (req, res) => {

var query = {};
var limit = req.query.limit !== 'undefined' ? req.query.limit : 2;

var offset = req.query.offset !== 'undefined' ? req.query.offset : 0;


  try {
    console.log(req.query);
    
    const productos = await Producto.find(query)
    .limit(Number(limit))
    .skip(Number(offset));

    const totalProductos = await Producto.find(query).countDocuments();
    // const totalProductos = totalProducto/limit;

    res.json({productos,totalProductos});
    // res.json(products : productos.map(funtion (articulo)));
    console.log(productos);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el GET de productos!!");
  }
});



// UNIFICADO FILTER
// GET -> Seleccionar todos los productos de una determinada categoria

router.get("/categoria/:tipo/", async (req, res) => {

  try {
    const products = await Producto.find({tipo : req.params.tipo});
    console.log(res);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el GET de productos!!");
  }
});

//UNIFICADO FILTER
// GET -> Seleccionar productos dependiendo del search

router.get("/search/:search/", async (req, res) => {

  let search = new RegExp(req.params.search); // parametro de búsqueda
  console.log(search);

  try {
    const products = await Producto.find({nombre : {$regex : search}});
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

// GET FILTERS -> Seleccionamos los productos seleccionados en los filtros -> filter

router.get("/filter/:filters", async (req, res) => {

    let value= JSON.parse((req.params.filters));
  
    let limit= value.limit;
    let offset= value.offset;

    let search = ((value.search != undefined) && (value.search != 0)) ? new RegExp(value.search) : "";
    let categoria = ((value.categoria != undefined) && (value.categoria != 0)) ? new RegExp(value.categoria) : "";
    let estado = ((value.estado != undefined) && (value.estado != 0)) ? new RegExp(value.estado) : "";
    let ubicacion = ((value.ubicacion != undefined) && (value.ubicacion != 0))? new RegExp(value.ubicacion) : "";
   
    let precioMin = value.precioMin;
    let precioMax = value.precioMax;

    var query = {}; //query para mongo.
    
    query={ nombre:{$regex : search},tipo:{$regex : categoria}, estado:{$regex : estado}, ubicacion:{$regex : ubicacion} };
    console.log(query);

  try {

    let producto;
    producto = await Producto.find(query)
    .limit(Number(limit))
    .skip(Number(offset));

    const totalProductos = await Producto.find(query).countDocuments();

    if(producto){
      console.log("******** RESPUESTA SERVER FILTER ********** ");

      res.json({producto,totalProductos,value}); //value es el valor de los filtros del Front.
    }else{
      res.status(500).send("No existe el producto con ese slug!!");
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el GET de producto!!");
  }
});

////////MOSTRAR DESDE FILTRO OK. PAGINACION ONCHANGE FILTERS.

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