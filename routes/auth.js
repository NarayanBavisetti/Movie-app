const express = require("express");
const user = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("../middleware");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!email || !username || !password || !confirmPassword) {
      return res.status(400).json({ msg: "Please fill all the details" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password does not match" });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new user({
      username,
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (e) {
    return res.status(500).json({ msg: "Error in server side" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill all the details" });
  }

  const existingUser = await user.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ msg: "Wrong email " });
  }
  const passwordCorrect = await bcrypt.compare(
    password,
    existingUser.passwordHash
  );

  if (!passwordCorrect) {
    return res.status(400).json({ msg: "Incorrect details" });
  }

  const token = jwt.sign(
    {
      user: existingUser._id,
    },
    process.env.JWT_SECRET
  );
  // res.json({token});
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.send("User logged In");
});

router.get("/logout", (req, res) => {
  res.cookie("token", " ", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });
  res.send("Logged out successfully");
});


router.get("/loggedIn",(req,res) => {
  try{
    const token = req.cookies.token;
    if(!token) return res.status(200).json(false)
    jwt.verify(token,process.env.JWT_SECRET);
    res.send(true)
  }catch(err){
    console.log(err);
    res.status(200).json(false);
  }
})

module.exports = router;
