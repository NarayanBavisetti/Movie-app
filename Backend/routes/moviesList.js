const express = require("express")
const router  = express.Router();
const { isLoggedIn } = require("../middleware");

router.post("/",isLoggedIn,(req,res) => {
    res.send("Yes logged in")
})