const User = require("../models/user");

module.exports.profile = async function(req, res){
    try{
        console.log(req.cookies);
        
        if(req.cookies._id){
            console.log("Hello profile cookie");
            let user = await User.findById(req.cookies.user_id);
              console.log("Hello profile outside");
              if(user){
                console.log("Hello profile inside");
                return res.render('user_profile', {
                    title: "User profile",
                    user: user
                 });
              }else{
                console.log("Hello profile else");
              return res.redirect('/users/sign-in');
            }
        }
    }catch(err){
        console.log("err");
        Console.log("Error in creating Cookies", err);
        return res.redirect('/users/sign-in');
    }   
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');   
      }
    return res.render('user_sign_up', {
        title: "Social | Sign Up"
    })
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');   
      }
    return res.render('user_sign_in', {
        title: "Social | Sign In"
    })
}

// get the signUp data
module.exports.create = async function(req, res){
   
    try{
        if (req.body.password != req.body.conform_password){
        console.log("before");
        return res.redirect('back');
    }
    
        let user = await User.findOne({email: req.body.email});

        if (!user){
            console.log("after");
        let user = await User.create(req.body);

        return res.redirect('/users/sign-in');
           
}}catch(err)
{
    console.log("Error to fecting siginning up page", err);
    return redirect('back');
}
    
}

module.exports.createSession = async function(req, res){
        return res.redirect('/');
    }; 
    
module.exports.destroySession = function(req,res){
        // this function is given to by request by using passport.js 
        req.logout(function(err) {
         if (err) {
           return next(err);
         }
        
         res.redirect("/");
       });
     }