var router = require('express').Router();
var mongoose = require('mongoose');

// Modelo de producto, proximamente importaremos los otros para -> populate
const Producto = require("../../models/producto");
const Comment = require("../../models/comment");
const User = require("../../models/user");
var auth = require('../auth');





router.param('comment', function(req, res, next, id) {

  Comment.findById(id).then(function(comment){
    if(!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
  }).catch(next);
});


router.param("slug", async (req, res, next, slug) => {

  await Producto.findOne({ slug: slug })
    .then(function (producto) {
      if (!producto) {
        return res.sendStatus(404);
      }
      req.producto = producto;
      return next();
    })
    .catch(next);
});

// GET -> Seleccionar todos los productos

router.get("/",auth.optional, async (req, res) => {

var query = {};
var limit = req.query.limit !== 'undefined' ? req.query.limit : 2;

var offset = req.query.offset !== 'undefined' ? req.query.offset : 0;


  try {

    return Promise.all([
      Producto.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .exec(),
        Producto.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null
    ]).then(function(results){

      var productos = results[0];
      var totalProductos = results[1];
      var user = results[2];

      return res.json({
        productos: productos.map(function(productos){
          return productos.toJSONFor(user);
        }),
        totalProductos: totalProductos
      });
    });

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

router.get("/filter/:filters",auth.optional, async (req, res) => {

    let value= JSON.parse((req.params.filters));
  
    let limit= value.limit;
    let offset= value.offset;

    let search = ((value.search != undefined) && (value.search != 0)) ? new RegExp(value.search) : "";
    let categoria = ((value.categoria != undefined) && (value.categoria != 0)) ? new RegExp(value.categoria) : "";
    let estado = ((value.estado != undefined) && (value.estado != 0)) ? new RegExp(value.estado) : "";
    let ubicacion = ((value.ubicacion != undefined) && (value.ubicacion != 0))? new RegExp(value.ubicacion) : "";
   

    var query = {}; //query para mongo.
    
    query={ nombre:{$regex : search},tipo:{$regex : categoria}, estado:{$regex : estado}, ubicacion:{$regex : ubicacion} };


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



// Favorite an producto

router.post('/:slug/favorite', auth.required, function(req, res, next) {
    
  console.log(req.producto);
   var productoId = req.producto._id;

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.favorite(productoId).then(function(){
      return req.producto.updateFavoriteCount().then(function(producto){
        return res.json({producto: producto.toJSONFor(user)});
      });
    });
  }).catch(next); 
});


// Unfavorite an producto

router.delete('/:slug/favorite', auth.required, function(req, res, next) {
  var productoId = req.producto._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(productoId).then(function(){
      return req.producto.updateFavoriteCount().then(function(producto){
        return res.json({producto: producto.toJSONFor(user)});
      });
    });
  }).catch(next);
});



// return an article's comments
router.get('/:producto/comments', auth.optional, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    return req.producto.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(producto) {
      return res.json({comments: req.producto.comments.map(function(comment){
        return comment.toJSONFor(user);
      })});
    });
  }).catch(next);
});



// create a new comment
router.post('/:producto/comments', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    var comment = new Comment(req.body.comment);
    comment.producto = req.producto;
    comment.author = user;

    return comment.save().then(function(){
      console.log("return save");
      console.log(req.producto.comments);
      req.producto.comments.push(comment);

      return req.producto.save().then(function(producto) {
        res.json({comment: comment.toJSONFor(user)});
      });
    });
  }).catch(next);
});


router.delete('/:producto/comments/:comment', auth.required, function(req, res, next) {
  if(req.comment.author.toString() === req.payload.id.toString()){
    req.producto.comments.remove(req.comment._id);
    req.producto.save()
      .then(Comment.find({_id: req.comment._id}).remove().exec())
      .then(function(){
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});


  module.exports = router;