const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.userPRotected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.devAuth
    // if (!token) {
    //     return res.status(401).json({ message: "No Cookie Fount" })
    // }

    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT error" })
        }
        req.body.userId = decode.userId
        next()
    })

})
exports.adminPRotected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.devAuth
    if (!token) {
        return res.status(401).json({ message: "No Cookie Fount" })
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT error" })
        }
        const result = await User.findById(decode.userId)
        if (!result || result.role !== "admin") {
            return res.status(401).json({ message: "Admin Only Route" })
        }
        req.body.userId = decode.userId
        next()
    })

})