const express = require('express')
const mongoose  = require('mongoose')
const cookieParser = require("cookie-parser")
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(() => console.log("DB connected successfully")).catch((err) => console.log(err))

app.use(express.json());
app.use(cookieParser());
const authRoute = require("./routes/auth")
const favRoute = require("./routes/favourite")
app.use(authRoute);
app.use(favRoute);


if ( process.env.NODE_ENV === "production"){
    app.use(express.static("frontend/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.listen(PORT,() => console.log(`PORT running at ${PORT}`))