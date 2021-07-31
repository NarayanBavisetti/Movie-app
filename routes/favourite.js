const express = require("express")
const router  = express.Router();
const { isLoggedIn } = require("../middleware");

router.post("/favourite",isLoggedIn,(req,res) => {
    console.log(req.user._id);
    res.json({msg:'favourite'})
})

module.exports = router;