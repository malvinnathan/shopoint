
if (process.env.NODE_ENV !== 'production'){     //Load our different environment variable
    require('dotenv').config()
}

// Establishing connection with the database
require('./models/db')
require('./models/user')

var mongoose = require("mongoose");
var User = mongoose.model("user")

const storeRouter = require('./routes/storeRouter')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')                    //A password hashing function
const passport = require('passport')               //Passport is authentication middleware
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const usermanagementRouter = require("./routes/usermanagementRouter")
const authenticationRouter = require("./routes/authenticationRouter")
const bodyParser = require('body-parser')
var LocalStrategy = require("passport-local");

const initializePassport = require('./passport-config')          //Use it to verify if the user the exist or not
initializePassport(
    passport,
    username => User.find(user => user.username === username),
    id => User.find(user =>user.id === id)
)

app.set('view-engine','ejs')                //Supports ejs file
app.use(express.urlencoded({extended: false}))
app.use(flash())                           //Define a flash message and render it without redirecting the request
app.use(express.static(__dirname +'/public'));
app.use(methodOverride('_method'))

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use(session({
    secret: 'secretidhere',              //A safe key that keeps our information and get it in the .env file
    resave: false,
    saveUninitialized: false
}))

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//search
app.use("/", storeRouter);

app.get('/about', (req,res) => {
    res.render('about.ejs')
})
// all management process goes here
app.use("/", usermanagementRouter)

// All authentication process goes here
app.use("/", authenticationRouter)

app.delete('/logout',(req,res) => {        //log out function and redirect to the login page
    req.session.destroy()
    req.logOut()
    res.redirect('/login')

})

app.listen(process.env.PORT || 3000, () => {
    console.log("The app is running!");
});