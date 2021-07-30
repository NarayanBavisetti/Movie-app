const mongoose = require('mongoose')
const favouriteSchema = mongoose.Schema({
    favourites: [{
         type: ObjectId,
          ref: "User" 
        }],
})