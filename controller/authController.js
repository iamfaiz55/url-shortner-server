const asyncHander = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const User = require("../models/User")

exports.register = asyncHander(async (req, res) => {
    const { name, email, password, role } = req.body
    if (!validator.isEmail(email)) {
        return res.status(400).json("Please Provide Valid Email")
    }
   
    if (!name) {
        return res.status(400).json("Please Provide Valid Name")

    }
    const result = await User.findOne({ email })
    if (result) {
        return res.status(400).json("Email is already In Use")
    }

    const hashPass = await bcrypt.hash(password, 10)

    await User.create({ ...req.body, password: hashPass })
    res.status(201).json({ message: "User Register Success" })
})

exports.login = asyncHander(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email And Password Required" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json("Please Provide Valid Email")
    }
  
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(400).json("Email Not Registered With Us")
    }

    if (!result.active) {
        return res.status(400).json({ message: "Account Block. Get In Touch With Admin" })
    }

    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Do Not Match" })
    }

    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })

    res.cookie("devAuth", token, { maxAge: 3600000 * 6 })

    res.status(201).json({
        message: "Login Success", result: {
            name: result.name,
            email: result.email,
            role: result.role,
            _id: result._id
        }
    })
})



exports.logout = asyncHander(async (req, res) => {
    res.clearCookie("devAuth")
    res.status(201).json({ message: "Logout Success" })
})