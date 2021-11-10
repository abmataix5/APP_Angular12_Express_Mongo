var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload user profile on routes with ':username'
router.param('username', function(req, res, next, username){
  User.findOne({username: username}).then(function(user){
    if (!user) { return res.sendStatus(404); }

    req.profile = user;

    return next();
  }).catch(next);
});

router.get('/:username', auth.optional, function(req, res, next){
  console.log("ENtra! list NORMAL");
  if(req.payload){
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.json({profile: req.profile.toProfileJSONFor(false)}); }

      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  } else {
    return res.json({profile: req.profile.toProfileJSONFor(false)});
  }
});

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


/* Rating users */

router.post('/rating/:rating', auth.required, async  function(req, res, next){

    let value= JSON.parse((req.params.rating));
      console.log(value.username);
      console.log(value.value);
      console.log(req.payload.id + ' id user');

      const usuario = await User.findOne({ username: value.username });



  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.rated(usuario._id,value.value).then(function(){
      console.log('todo bien');
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  }).catch(next);

});

/* Followers List */

router.get('/followers/:username', auth.required, function(req, res, next){
  

  console.log("Entra! list Followed");
  if(req.payload){
    User.findById(req.payload.id).populate('followers').then(function(user){
      return res.json({profile: user.toJSONFor(user)});
    console.log(user);
    });
  } else {
    // return res.json({profile: req.profile.toProfileJSONFor(false)});
  }
});

module.exports = router;
