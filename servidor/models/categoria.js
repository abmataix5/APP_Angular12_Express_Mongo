const mongoose = require('mongoose');
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");



const CategoriaSchema =  mongoose.Schema({
    
    slug:{
        type: String, 
        lowercase: true, 
        unique: true
    },

    nombre_catego:{
        type:String,
        required:true
    },
    descripcion:{
        type:String
    },
    productos:[{type: mongoose.Schema.Types.ObjectId, ref: 'Producto'}]
     
    


});


// Nos valida el esquema

CategoriaSchema.plugin(uniqueValidator, {message: 'no se cumple el esquema!'}); // instalar -> npm install --save mongoose-unique-validator


//Slug, comprueba que el slug no se repita, si no hace otro nuevo

CategoriaSchema.pre('validate', function(next){
    if(!this.slug)  {
      this.slugify();
    }
 
    next();
});
  
// Crea el slug apartir del nombre del producto(luego lo utilizaremos para buscarlo)

CategoriaSchema.methods.slugify = function() {
    this.slug = slug(this.nombre_catego) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36); // instala slug -> npm install slug -> npm update
 };


//toJsonFor para cambiar estructuras

 //ArticleSchema.methods.toJSONFor = function(user){
 //  return {
 //  slug: this.slug,
 // title: this.title,
 // description: this.description,
 // body: this.body,
 // createdAt: this.createdAt,
 //updatedAt: this.updatedAt,
 // tagList: this.tagList,
 // favorited: user ? user.isFavorite(this._id) : false,
 // favoritesCount: this.favoritesCount,
 // author: this.author.toProfileJSONFor(user)
 //  };
 // };

module.exports = mongoose.model('Categoria', CategoriaSchema);