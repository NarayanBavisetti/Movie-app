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
            imdbID:{
                type:String,
            },
            Title:{
                type:String,
            },
            Poster:{
                type:String,
            }
        }
    ]
})
const user = mongoose.model("User" , UserSchema);
module.exports = user;