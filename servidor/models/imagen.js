const mongoose = require('mongoose');
var uniqueValidator = require("mongoose-unique-validator");


const ImagenSchema =  mongoose.Schema({
    

    src:{
        type:String,
        required:true
    },
    alt:{
        type:String
    }


});


// Nos valida el esquema

ImagenSchema.plugin(uniqueValidator, {message: 'no se cumple el esquema!'}); // instalar -> npm install --save mongoose-unique-validator


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

module.exports = mongoose.model('Imagen', ImagenSchema);