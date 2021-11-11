var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
const Order = require("../../models/order"); 
var auth = require('../auth');

// Preload user profile on routes with ':username'
router.param('username', function(req, res, next, username){
  User.findOne({username: username}).then(function(user){
    if (!user) { return res.sendStatus(404); }

    req.profile = user;

    return next();
  }).catch(next);
});

/* Get Profile */

router.get('/:username', auth.optional, function(req, res, next){

  if(req.payload){

    User.findById(req.payload.id).then(function(user){

      if(!user){ return res.json({profile: req.profile.toProfileJSONFor(false)}); }   /* Si no encuntra ningun user */


      Order.aggregate([                                                               /* Para saber la valoraciones media de sus productos */
        { $match: { user_venta: req.profile._id } },
        { $group: { _id: req.profile.username, rating_media: { $avg: "$rating" } } },
      ]).then(function (rating) {
            
        if(rating.length == 0){
          return res.json({profile: req.profile.toProfileJSONFor(user,'Sin valoraciones')});
        }else{
          return res.json({profile: req.profile.toProfileJSONFor(user,rating[0].rating_media)});
        }
      
      });

 
    });
  } else {

    Order.aggregate([
      { $match: { user_venta: req.profile._id } },
      { $group: { _id: req.profile.username, rating_media: { $avg: "$rating" } } },
    ]).then(function (rating) {
    
      if(rating[0].rating_media){
      
        return res.json({profile: req.profile.toProfileJSONFor(false,rating[0].rating_media)});

      }else{
        return res.json({profile: req.profile.toProfileJSONFor(false,'Sin valoraciones')});
      }
  
    });


  }
});



/* Follow */


router.post('/:username/follow', auth.required, async function(req, res, next){
  var profileId = req.profile._id;

console.log(profileId);

  await User.findById(req.payload.id).then(function(user){ //buscamos al usuario (currentUser payload)
    user.incrementKarma(user,20);
  });
 
  await User.findById(req.profile._id).then(function(user){ //buscamos al usuario (toFollowUser)
    user.incrementKarma(user,15);
  });
  console.log(req.payload.id);
  console.log(req.profile._id);

  await User.findById(req.profile._id).then(function(user){ //Añadimos el usuario que ha hecho follow como seguidor (Follower).
    user.addFollowers(req.payload.id);
  });


  await User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.follow(profileId).then(function(){
      console.log('todo bien');
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  }).catch(next);
});


/* Unfollow */

router.delete('/:username/follow', auth.required, async function(req, res, next){
  var profileId = req.profile._id;
  console.log("Entra unfollow");
  await User.findById(req.payload.id).then(function(user){ //buscamos al usuario (currentUser payload)
    user.decrementKarma(user,10);
  });
  await User.findById(req.profile._id).then(function(user){ //buscamos al usuario (currentUser payload)
    user.incrementKarma(user,15);
  });

  await User.findById(req.profile._id).then(function(user){ //Añadimos el usuario que ha hecho follow como seguidor (Follower).
    user.removeFollowers(req.payload.id);
  });
  await User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.unfollow(profileId).then(function(){
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  }).catch(next);
});



/* Followers List */

router.get('/followers/:username', auth.required, function(req, res, next){
  
  if(req.payload){
    User.findById(req.payload.id).populate('followers').then(function(user){ // obtener los datos de los usuarios, seguidores del usuario.
      return res.json({profile: user.toJSONFor(user)});

    });
  } else {
    return res.json({profile: user.toJSONFor(false)});
  }
});

/* Following List */

router.get('/following/:username', auth.required, function(req, res, next){
  
  if(req.payload){
    User.findById(req.payload.id).populate('following').then(function(user){ // obtener los datos de los usuarios, seguidos por el usuario.
      return res.json({profile: user.toJSONFor(user)});
    });
  } else {
    return res.json({profile: user.toJSONFor(false)});
  }
});

module.exports = router;
