var blogPost = require("../models/blogPost"),
    blogComments = require("../models/blogComments");


var middlewareObj = {};

//Checking for Loggin
middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in to do that!") 
    res.redirect("/login");
}

middlewareObj.checkBlogPostOwnership = (req, res, next)=>{
    if(req.isAuthenticated()){
        blogPost.findById(req.params.id, (err, foundBlog)=>{
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
              if(foundBlog.author.id.equals(req.user._id)){
                  return next();
              } else {
                  req.flash("error", "You are not Authorized to do this!!")
                  res.redirect("/dashboard/" + req.params.id);
              }
            }
        });
    } 
}

middlewareObj.checkBlogCommentOwnership = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    } 
}
module.exports = middlewareObj;