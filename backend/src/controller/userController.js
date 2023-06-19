const user = require("../model/userModel");
const generateToken = require("../middleware/authenticate");
const registerUser = async (req, res) => {
  try {
    const { fname, lname, phone, role, email, password } = req.body;
    const data = await user.findOne({ email });
    if (data) {
      // res.status(400).send("user already exixts");
      throw new Error("user already exixts");
    }
    const userData = await user.create({
      fname,
      lname,
      phone,
      role,
      email,
      password,
    });
    res.status(201).json({
      _id: userData._id,
      fname: userData.fname,
      lname: userData.lname,
      phone: userData.phone,
      role: userData.role,
      email: userData.email,
      password: userData.password,
      token: generateToken(userData._id),
    });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("please fill all the fields");
    }

    const data = await user.findOne({ email });

    if (data && (await data.matchPassword(password))) {
      res.status(200).json({
        _id: data._id,
        fname: data.fname,
        lname: data.lname,
        token: generateToken(data._id),
        email: data.email,
        role: data.role,
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const searchUser = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const data = await user
      .find(searchUser)
      .find({ $ne: { _id: req.user._id } });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

module.exports = { registerUser, login, getAllUsers };
