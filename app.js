//============================
//Declaration of Packages
var express                 = require("express"),
    expressSession          = require("express-session"),
    bodyParser              = require("body-parser"),
    expressSanitizer        = require("express-sanitizer"),
    flash                   = require("connect-flash"),
    methodOverride          = require("method-override"),
    User                    = require("./models/user"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    mongoose                = require("mongoose");

//============================

//============================
//Routes Controller handlers all Routes coming from the router directory
//============================
var indexRoutes         = require("./routes/index");
var blogPostRoutes      = require("./routes/blogs");
var blogCommentsRoutes  = require("./routes/blogComments");
var dashboardRoutes     = require("./routes/dashboard");
var curriculaRoutes     = require("./routes/curricula");
var industryCourse      = require("./routes/industryCourse");
var profileRoutes       = require("./routes/profile");
var adminRoutes         = require('./routes/admin');
//============================

//============================
//Configure connection to Mongodb
mongoose.connect('mongodb://localhost/varsind_app');
//============================

//============================
//Initialize express app
var app = express();
//============================


//============================
//define all packages for express app to SET n USE
//============================
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(flash());
app.use(expressSession({
    secret: "Project work",
    resave: false,
    saveUninitialized: false
}));

//user Auths routs with passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//============================

//Middleware to track the currentUser
app.use(async function(req, res, next){
    res.locals.currentUser = req.user;
    if(req.user) {
     try {
       let user = await User.findById(req.user._id).populate('notifications', null, { isRead: false }).exec();
       res.locals.notifications = user.notifications.reverse();
     } catch(err) {
       console.log(err.message);
     }
    }
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });


// ====================================
//We point out app to use the required routes
// ====================================
app.use("/", indexRoutes);
app.use("/blogs", blogPostRoutes);
app.use("/blogComments/:id", blogCommentsRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/curricula", curriculaRoutes);
app.use("/industryCourse", industryCourse);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
// ====================================


//Server Port Environment
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port} .....`));