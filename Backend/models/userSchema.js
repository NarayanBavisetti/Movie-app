const express = require('express')
const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    passwordHash:{
        type:String,
        require:true,
    },
    favourites: [{
        type: ObjectId,
         ref: "User" 
       }],
})
const user = mongoose.model("User" , UserSchema);
module.exports = user;