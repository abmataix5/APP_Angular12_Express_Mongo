const mongoose = require('mongoose');
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");



const ProductoSchema =  mongoose.Schema({
    
    slug:{
        type: String, 
        lowercase: true, 
        unique: true
    },

    nombre:{
        type:String,
        required:true
    },

    tipo: {  
        type:String,
        required:true
    },

    marca: {
        type: String,
        required: true
    },

    modelo: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    descripcion: {
        type: String,
       
    },

    imagen :{
        type:String,
        required:true
    },
    
    ubicacion:{
        type:String,
    },
    
    fecha_alta: {
        type: Date,
        default:Date.now()
    }
});


// Nos valida el esquema

ProductoSchema.plugin(uniqueValidator, {message: 'no se cumple el esquema!'}); // instalar -> npm install --save mongoose-unique-validator


//Slug, comprueba que el slug no se repita, si no hace otro nuevo

ProductoSchema.pre('validate', function(next){
    if(!this.slug)  {
      this.slugify();
    }
 
    next();
});
  
// Crea el slug apartir del nombre del producto(luego lo utilizaremos para buscarlo)

ProductoSchema.methods.slugify = function() {
    this.slug = slug(this.nombre) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36); // instala slug -> npm install slug -> npm update
 };


//toJsonFor para cambiar estructuras

//  ProductoSchema.methods.toJSONFor = function(){
//   return {
//     slug: this.slug,
//     nombre: this.nombre,
//     tipo: this.tipo,
//     marca: this.marca,
//     modelo: this.modelo,
//     estado: this.estado,
//     precio: this.precio,
//     descripcion: this.descripcion,
//     imagen: this.imagen,
//     ubicacion: this.ubicacion,
//     fecha_alta: this.fecha_alta,
//   };
// };

module.exports = mongoose.model('Producto', ProductoSchema);