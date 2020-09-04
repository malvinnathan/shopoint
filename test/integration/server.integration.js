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
        
        it("all elments should be return when calling getUserProfile function", ()=>{
            testuser.forEach(element=>{
                expect(element).to.have.keys(['id','email','phonenumber','studentid','uni','username', 'first_name', 'last_name', 'password']);
            });   
        });

        it("all element format should be correct when calling getUserProfile function", ()=>{
            testuser.forEach(element=>{
                expect(element).to.have.property("id").and.to.be.a('string');
                expect(element).to.have.property("username").and.to.be.a('string');
                expect(element).to.have.property("first_name").and.to.be.a('string');
                expect(element).to.have.property("last_name").and.to.be.a('string');
                expect(element).to.have.property("phonenumber").and.to.be.a('number');
                expect(element).to.have.property("uni").and.to.be.a('string');
                expect(element).to.have.property("email").and.to.be.a('string');
                expect(element).to.have.property("studentid").and.to.be.a('number');
            });   
        });

    });
    // Test updateUser with fake DB
     describe ('updateUser',function(){

        it ("all elements except for id and username could be updated", () =>{
            testuser.forEach(element=>{
                expect(element).to.extensible;
            }); 
        });

     }); 
     // Test updateUser with fake DB
     describe ('registerUser',function(){

        it ("all elements must not be empty", () =>{
            testuser.forEach(element=>{
                expect(element).to.not.be.empty;
            }); 
        });

     }); 



});
