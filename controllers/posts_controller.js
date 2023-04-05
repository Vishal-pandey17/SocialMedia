const Post = require('../models/post')

module.exports.create = async function(req,res){
    // Post.create({
    //    content: req.body.content,
    //    user: req.user._id
    // }, function(err, post){
    //    if(err){
    //      console.log('error in creating a post');
    //      return;
    //    }
    //    return res.redirect('back');
    // });
 
        // Using async and await
    try{
      let post =  await Post.create({
          content: req.body.content,
          user: req.user._id
       });
     
       if(req.xhr){
          post = await post.populate('user', 'name');
          return res.status(200).json({
             data: {
                post: post
             },
             message: "Post created!"
          });
       }
       
       
       return res.redirect('back');
    }catch(err){
       // console.log("Error in creating the posts", err);
       
       return res.redirect('back');
    }
 }
 