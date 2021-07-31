const jwt = require("jsonwebtoken");
const user = require("./models/userSchema");

const isLoggedIn = async(req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      return res.status(401).json({ msg: "unauthorized user" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const rootUser = await user.findOne({_id:verified._id})
    if(!rootUser){
      return res.status(401).json({ msg: "user not foound" });
    }
    req.token = token;
    req.rootUser = rootUser;
    
    next();
  } catch (e) {
    return res.status(500).json({ msg: "unauthorized user" });
  }
};

module.exports = {isLoggedIn};