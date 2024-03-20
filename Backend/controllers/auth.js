const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver.js");

/* REGISTER DRIVER */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newDriver = new Driver({
      name,
      email: email.toLowerCase(),
      password: passwordHash,
    });
    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* LOGIN */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email: email.toLowerCase() });
    if (!driver) return res.status(400).json({ msg: "Driver does not exist."});

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid  credentials"});

    const token = jwt.sign({ id: driver._id}, process.env.JWT_SECRET);
    delete driver.password;
    res.status(200).json({ token, driver});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { register, login };
