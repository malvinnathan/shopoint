const bcrypt = require('bcrypt')
var mongoose = require("mongoose");
var User = mongoose.model("user");


const renderLogin = (req,res) => {
  //Get the login page from the views file
  res.render('login.ejs')
}

const loginSuccess = async(req,res) => {
  try {
      const username = req.session.passport.user;
      const users = await User.find({username: username});
      const user = users[0];
      res.render('index.ejs',{ user})

  } catch (err) {
      res.status(400);
      return res.send("Database query failed");
  }   //The home page and show the user's name
}

// Give the status of the updated password
const renderPassword = (req, res) => {
  res.render('changepassword.ejs', {message : req.flash('message')});
}

// Update the password
const updatePassword = async(req, res) => {
  
  // Find the user in the database
  const username = req.session.passport.user;
  const users = await User.find({username: username});
  const user = users[0];
 
  // if no user is found, we go back to the home page
  if (!user){
    return res.redirect('/');
  }
  // Then we check if the password entered the same as the password stored in the database. 
  var currentpassword = user.bcryptpassword
  var value = bcrypt.compareSync(req.body.password, currentpassword)

  //if the password is the same, then we can change the password
  if (value === true && req.body.newpassword !== '') {
      const hashedPassword = await bcrypt.hash(req.body.newpassword,10)
      // update the bcrypted password and mongodb password
      user.bcryptpassword = hashedPassword;
      await user.setPassword(req.body.newpassword);
      await user.save();
      req.flash('message', "1");
  }
  // if the value is false, then we send an error message
  else if (value === false && req.body.newpassword !== ''){
      req.flash('message', "2");
  }
  else {
    req.flash('message', "3");
  }

  res.redirect('/changepassword');
}


//export the functions
module.exports = {
  renderPassword, 
  updatePassword,
  loginSuccess,
  renderLogin
};

