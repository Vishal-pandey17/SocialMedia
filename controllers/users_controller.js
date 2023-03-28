const User = require("../models/user");

module.exports.profile = async function(req, res){
    try{
        if(req.cookies.user_id){
            let user = await User.findById(req.cookies.user_id);
              if(user){
                return res.render('user_profile', {
                    title: "User profile",
                    user: user
                 });
              }
        }else{
          return res.redirect('/users/sign-in');
        }
    }catch(err){
        Console.log("Error in creating Cookies", err);
        return res.redirect('/users/sign-in');
    }   
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Social | Sign Up"
    })
}

module.exports.signIn = function(req, res){
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
    // Steps to Manual Authentication
    // Find the user
    try{
        let user = await User.findOne({email: req.body.email});
        // handle user found
        if(user){
              // handle password which don't match
               if(user.password != req.body.password){
                return res.redirect('back');
               }
             // handle session creation 
             res.cookie('user_id', user.id);
             return res.redirect('/users/profile'); 
        }else{
            // handle user not found
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error in creating session", err);
        return res.redirect('back');
    } 
    
    }; 