const express = require('express')
const mongoose  = require('mongoose')
const cookieParser = require("cookie-parser")
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    // useFindAndModify:true,
    useUnifiedTopology:true
}).then(() => console.log("DB connected successfully")).catch((err) => console.log(err))

app.use(express.json());
app.use(cookieParser());
const authRoute = require("./routes/auth")
app.use(authRoute);

app.get("/",(req,res) => {
    res.send("HI bruh");
})

app.listen(PORT,() => console.log(`PORT running at ${PORT}`))