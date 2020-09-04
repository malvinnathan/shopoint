var mongoose = require("mongoose");
var User = mongoose.model("user"); 
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const renderRegister = (req,res) => {
  //Get the register page from the views file
  res.render('register.ejs');
}

const registerUser = async(req,res) => {
  const hashedPassword = await bcrypt.hash(req.body.password,10);
  // Add the user to the database after they've input info in the register page
  User.register(new User({ 
          id: Date.now().toString(),
          username: req.body.username,
          bcryptpassword: hashedPassword,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email:req.body.email,
          phonenumber: req.body.phonenumber,
          birthday:req.body.birthday,
          uni: req.body.uni,
          studentid: req.body.studentid
      }),
      req.body.password, function(err, user){
          if(err){
              console.log(err);
              return res.render('/login');
          }
          passport.authenticate("local")(req, res, function(){
              res.redirect("/login");
          });
      });
      // redirect them to login page upon successfull registration
  res.redirect("/login");
}

const getUserProfile = async(req, res) => {

  try {
    	// Get the profile page of the user.. 
    const username = req.session.passport.user;
    const users = await User.find({username: username});
    const user = users[0];
    res.render('editprofile.ejs',{user}) 

  } catch (err) {
      res.status(400);
      return res.send("Database query failed");
    }
}

const updateUser = async(req, res) => {

  try {
    // Get the profile page of the user.. 
    const new_profile = req.body;
    // search for user based on id in the database. 
    const username = req.session.passport.user;
    const users = await User.find({username: username});
    const user = users[0];
    // if no user is found, we go back to the home page
    if (!user){
      return res.redirect('/');
    }
    
  // update the user information
    for (const i in user){
      // if there is an update on their profile, we change that value. 
      if (new_profile[i]) {
          var object = `${i}`;
          user[object] = new_profile[i];
      }
    }
  // save the updated user data in the database
    user.save();
    res.redirect('/editprofile');
} catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
}


//export the functions
module.exports = {
  getUserProfile, 
  updateUser,
  renderRegister, 
  registerUser
};

