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
    favourites:[
        {
            imdb:{
                type:mongoose.Schema.Types.ObjectId
            },
            Title:{
                
            }
            // imdbID:{
            //     type:String,
            //     required:true
            // },
            // Title:{
            // type:String,
            // required:true
            // }
        }
    ]
})
const user = mongoose.model("User" , UserSchema);
module.exports = user;