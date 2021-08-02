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

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(200).json(false);
    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (err) {
    console.log(err);
    res.status(200).json(false);
  }
});

//get items from cart
router.get("/favourite", isLoggedIn, async (req, res) => {
  try {
    const userid = await req.user;
    const User = await user.findById(userid).populate("favourite");
    res.status(200).json(User.favourite);
    // console.log(User.favourite)
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
});

//add items in the cart
router.post("/favourite/add", isLoggedIn, async(req, res) => {
  try {
    const { imdbID,Title,Poster } = req.body;
    const userid = req.user;
    const User = await user.findById(userid);
    const data ={
      imdbID,
      Title,
      Poster
    }
    // console.log(data)
    User.favourite.push(data);
    await User.save();
    res.status(200).json("added to cart successfully");
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
});

router.post("/favourite/remove", isLoggedIn, async(req, res) => {
  try {
    const { id } = req.body;
  
    // console.log(id);
    const userid = req.user;
    const User = await user.findById(userid);
    
    User.favourite.pull(req.body);
    await User.save();
    res.status(200).json("Remove from cart successfully");
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
});

module.exports = router;
