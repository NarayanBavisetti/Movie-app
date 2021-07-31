const mongoose = require('mongoose')
const favouriteSchema = new mongoose.Schema({
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
favourites:[
    {
        imdbID:{
            type:String,
            required:true
        },
        Title:{
        type:String,
        required:true
        }
    }
]

})

const Favourite = mongoose.model("shopping-app-favourite", favouriteSchema);
module.exports = Favourite;

