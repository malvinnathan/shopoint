const express = require("express");

// create router
const usermanagementRouter = express.Router();

// load/import the storepage controller

const usermanagementController = require("../controllers/usermanagementController.js");

// Get the profile page of the user.. 
usermanagementRouter.get('/editprofile', (req,res)=> usermanagementController.getUserProfile(req,res));

// Update the profile of the person by using PUT function. 
usermanagementRouter.put('/editprofile/:id', (req, res)=> usermanagementController.updateUser(req,res));

usermanagementRouter.get('/register', checkNotAuthenticated, (req, res) => usermanagementController.renderRegister(req,res));

usermanagementRouter.post('/register', async(req,res) => usermanagementController.registerUser(req,res));

function checkNotAuthenticated(req,res,next){

    //To avoid the user go to login or register page without logout the account
    if(req.session.passport !== undefined){
        return res.redirect('/index');
    }else {
        return next();
    }
}


// export the router
module.exports = usermanagementRouter;
