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
    favourite:[
        {
            Title:{
                type:String,
            }
        }
    ]
})
const user = mongoose.model("User" , UserSchema);
module.exports = user;