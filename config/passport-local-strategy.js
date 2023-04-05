const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
     usernameField: 'email'
}, 
  async function(email, password, done){
    try{
      let user = await User.findOne({email: email});
        if(!user || user.password != password){
          console.log("Invalid Username/Password");
          return done(null, false);
        }
       
       return done(null, user);
    }catch(err){
      console.log("Error in create session using passport local startegy", err);
    }
     
  }
))
// serializing the user is decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
        done(null, user.id);
});

// deserializing the user from the key in the cookie
   passport.deserializeUser(async function(id, done){
    try{
      let user = await User.findById(id);

      return done(null, user);
    }catch(err){
      console.log('Error to finding user ---> passport'); 
      return done(err);
    }
       
    });
// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
  //if the user is sign in, then pass on the request to the next function(controller action) 
  if(req.isAuthenticated()){
   
      return next();
  }
  // if the user is not sign in 
  
  return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
      // req.user contains the current signed in user fron the session cookie and we are just sending 
      // to locals for the views
      res.locals.user = req.user
  }
  next();
}

module.exports = passport;