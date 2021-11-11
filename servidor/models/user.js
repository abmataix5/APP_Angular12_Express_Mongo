const mongoose = require('mongoose');
var uniqueValidator = require("mongoose-unique-validator");
var crypto = require("crypto");
var jwt = require('jsonwebtoken'); // -> npm install jsonwebtoken
var secret = require("../config").secret;


const UserSchema =  mongoose.Schema({
    
    username:{
        type: String, 
        lowercase: true, 
        unique: true
    },
    email:{
        type:String,
        required:true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    location:{
      type:String,
      default :'Valencia'
    },
    hash:String,
    salt:String,
    image:{
        type:String
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  /*  rating:[
      {
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
        value :{type: Number}
      }
    ] */
    karma: {type: Number, default: 0},

},
{timestamps:true});


// Nos valida el esquema

UserSchema.plugin(uniqueValidator, {message: 'no se cumple el esquema!'}); // instalar -> npm install --save mongoose-unique-validator



UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };


UserSchema.methods.toAuthJSON = function(){
    return {
      username: this.username,
      email: this.email,
      token: this.generateJWT(),
      image: this.image,
      location:this.location
    };
  };

  UserSchema.methods.toProfileJSONFor = function(user){
    return {
      username: this.username,
      image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: user ? user.isFollowing(this._id) : false,
      email: this.email,
      favorites: this.favorites,
      location:this.location,
      /* rating : this.rating */
      karma:this.karma,
      followers:this.followers,
      followed:this.following
    };
  };

  UserSchema.methods.toJSONFor = function(){
    return {
      followers:this.followers,
      following:this.following
    };
  };

  UserSchema.methods.favorite = function(id){
    if(this.favorites.indexOf(id) === -1){
      this.favorites.push(id);
    }
    return this.save();
  };


  UserSchema.methods.unfavorite = function(id){
    this.favorites.remove(id);
    return this.save();
  };



  UserSchema.methods.isFavorite = function(id){
    return this.favorites.some(function(favoriteId){
      return favoriteId.toString() === id.toString();
    });
  };
  
  UserSchema.methods.follow = function(id){
    if(this.following.indexOf(id) === -1){
      this.following.push(id);
    }
  
    return this.save();
  };
  
  UserSchema.methods.unfollow = function(id){
    this.following.remove(id);
    return this.save();
  };
  
  UserSchema.methods.isFollowing = function(id){
    return this.following.some(function(followId){
      return followId.toString() === id.toString();
    });
  };


  UserSchema.methods.rated = function(id,value){

    const up = {
      author: id,
      value : value
    }
    if(this.rating.indexOf(id) === -1){
      this.rating.push(up);
    }
  
    return this.save();
  };
  
  UserSchema.methods.incrementKarma = function(userKarma, qty) {
    userKarma.karma += qty;
    return userKarma.save();
  }

  UserSchema.methods.decrementKarma = function(userKarma, qty) {
    userKarma.karma -= qty;
    return userKarma.save();
  }

  UserSchema.methods.addFollowers = function(id){
    if(this.followers.indexOf(id) === -1){
      this.followers.push(id);
    }
    return this.save();
  };
  UserSchema.methods.removeFollowers = function(id){
    this.followers.remove(id);
    return this.save();
  };
module.exports = mongoose.model('User', UserSchema);