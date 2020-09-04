
const express = require("express");
const passport = require("passport");
// create router
const authenticationRouter = express.Router();

// load/import the storepage controller

const authenticationController = require("../controllers/authenticationController.js");

// Update the password of the person by using PUT function. 
authenticationRouter.post('/changepassword',async(req, res) => authenticationController.updatePassword(req,res));

authenticationRouter.get('/changepassword', (req, res)=> authenticationController.renderPassword(req,res));

authenticationRouter.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash : true
}));
authenticationRouter.get('/login', checkNotAuthenticated,(req,res) => authenticationController.renderLogin(req,res));
authenticationRouter.get('/', checkNotAuthenticated,(req,res) => authenticationController.renderLogin(req,res));



authenticationRouter.get('/index', checkAuthenticated, async(req,res,next) => authenticationController.loginSuccess(req,res));

function checkAuthenticated(req,res,next){
    //Check if the user is authenticated or not if yes next, otherwise redirect
    if (req.session.passport === undefined){
        res.redirect('/login');
    } else {
        return next();
    }
}
function checkNotAuthenticated(req,res,next){
    //To avoid the user go to login or register page without logout the account
    if(req.session.passport !== undefined){
        return res.redirect('/index');
    }else {
        return next();
    }
}

// export the router
module.exports = authenticationRouter;
