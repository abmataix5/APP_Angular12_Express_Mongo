var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require("passport");
const User = require("../../models/user");
var auth = require('../auth');

let client = require('prom-client');

const contadorUsuarios = new client.Counter({
  name: 'contadorUsuarios',
  help: 'Numero total de requests'
});



router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});



router.put('/user', auth.required, function(req, res, next){
  console.log(req.body.user);
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }
    if(typeof req.body.user.location !== 'undefined'){
      user.location = req.body.user.location;
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/login', function(req, res, next){

  contadorUsuarios.inc();

  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "no puede quedar-se en blanco"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/register', function(req, res, next){

  counterUsersEndpoint.inc();

   var user = new User();

  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.username = req.body.user.username;

  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next); 
});

module.exports = router;