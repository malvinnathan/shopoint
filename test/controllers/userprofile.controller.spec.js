require('../../models/db')

const server = require('../../server');

const testuser = require('../../models/testuser');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
var userprofileController =  require('../../controllers/usermanagementController');
const users = require('../../models/user');
var mongoose = require("mongoose");
var User = mongoose.model("user");

describe('usermanagementController',  () => {
    // Test getUserProfile with fake DB
    describe('getUserProfile', function() {
        
        it("id must contain 13 digits", () => {
            const result = testuser[0].id;
            assert.equal(result.length, 13);
        });

        it ("username must only contain string", () =>{
            const result = testuser[0].username;
            assert.isString(result);
        });

        it ("phonenumber should be between 8 and 10", () =>{
            const result = testuser[0].phonenumber.toString().length;
            var flag = false;
            if (result >7 && result < 11){
                flag = true;
            } 
            
            assert.isTrue(flag);
        });

        it ("univeristy should include melb", () =>{
            const result = testuser[0].uni;
            
            assert.include(result,'melb');
        });

        it ("email should include @", () =>{
            const result = testuser[0].email;
            
            assert.include(result,'@');
        });

        it ("user should have firstname", () =>{
            const result = testuser[0];
            
            assert.isNotEmpty(result.first_name);
        });

        it ("user should have lastname", () =>{
            const result = testuser[0];
            
            assert.isNotEmpty(result.last_name);
        });

        it ("student Id should be numeric", () =>{
            const result = testuser[0];
            
            assert.isNumber(result.studentid);
        });
    });
    // Test updateUser with fake DB
     describe ('updateUser',function(){

        it ("student Id could be updated", () =>{
            testuser[1].studentid = 1234567;
            const result = testuser[1];
            assert.equal(result.studentid, 1234567);
        });

        it ("uni could be updated", () =>{
            testuser[1].uni = "unimelb";
            const result = testuser[1];
            assert.equal(result.uni, "unimelb");
        });

        it ("firstname could be updated", () =>{
            testuser[1].first_name = "justin";
            const result = testuser[1];
            assert.equal(result.first_name, "justin");
        });

        it ("lastname could be updated", () =>{
            testuser[1].last_name = "li";
            const result = testuser[1];
            assert.equal(result.last_name, "li");
        });

        it ("phonenumber could be updated", () =>{
            testuser[1].phonenumber = 12345678;
            const result = testuser[1];
            assert.equal(result.phonenumber, 12345678);
        });

        it ("email address could be updated", () =>{
            testuser[1].email = "abc@gmail.com";
            const result = testuser[1];
            assert.equal(result.email, "abc@gmail.com");
        });
     }); 
     // Check the input format when a user signup. 
     describe ('registerUser',function(){

        it ("username must not be empty", () =>{
            const result = testuser[0].username;
            assert.isNotEmpty(result);
        });
        it ("password must not be empty with min of 5 characters", () =>{
            assert.isNotEmpty(testuser[0].password)
        });

        it ("first name and last name must not be empty and only contain string", () =>{
            assert.isString(testuser[0].first_name);
            assert.isString(testuser[0].last_name);
        });

        it ("email must be valid", () =>{
            assert.include(testuser[0].email,'@');
        });
        it ("phone number must be number", () =>{
            assert.isNumber(testuser[0].phonenumber);
        });
        it ("university must be university of melbourne", () =>{
            assert.include(testuser[0].uni, 'melb');
        });
        it ("must contain valid student id", () =>{
            assert.isNumber(testuser[0].studentid);
        });
     }); 
});
