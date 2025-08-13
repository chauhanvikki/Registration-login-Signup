const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      return res
        .status(409)
        .json({ message: "Email is already registered", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    const jwtToken = jwt.sign(
      { id: newUser._id, email: newUser.email }, // payload
      process.env.JWT_SECRET, // secret key from .env
      { expiresIn: "1h" } // optional expiration
    );
    res.status(201).json({ message: "SignUp success✌️", success: true, jwtToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error😒", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    // const error="User is already exist , you can login";
    const errorAuth = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorAuth, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorAuth, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    if(isPassEqual){
      return res.status(200).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
    }
    
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error😒", success: false });
  }
};

module.exports = {
  signup,
  login,
};
