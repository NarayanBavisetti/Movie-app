const jwt = require("jsonwebtoken");

function isLoggedIn(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "unauthorized user 2" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;

    next();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: "unauthorized user " });
  }
}

module.exports = { isLoggedIn };
