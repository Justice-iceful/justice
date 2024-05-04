var mongoose  = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    email: {type: String, unique: true, required: true},
    designation: String,
    gender: String,
    date: {type: Date, default: Date.now},
    country: String,
    coverpics: {type: String, default: 'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80'},
    coverpicsId: String,
    firstName: String,
    lastName: String,
    avatar: {type: String, default: '../images/phmale.jpg'},
    avatarId: String,
    headlines: String, 

    student:{
          school: String,
          degree: String,
          programme: String
          },

    professional:{
      workplace: String,
      jobTitle: String
     },

     industry:{
         name: String,
         website: String
     },

     //Admin section
     adminRole: String,
     adminName: String,


     //Referencial Associations
     blogPost: [
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: "BlogPost"
       }
     ],
     notifications: [
    	{
    	   type: mongoose.Schema.Types.ObjectId,
    	   ref: 'Notification'
    	}
    ],
    followers: [
    	{
    		id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
          username: String,
          avatar: String
      }
    ]

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);