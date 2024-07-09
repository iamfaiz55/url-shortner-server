const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const Url = require("../models/Url")

exports.AdmingetAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find({ role: "user" })
    res.status(200).json({ message: "All Users Fetch Success", result })
})
exports.adminUpdateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    await User.findByIdAndUpdate(userId, { ...req.body, role: "user" }, { runValidators: true })
    res.status(201).json({ message: "User Update Success" })
})
exports.adminGetUserUrls = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const result = await Url.find({ userId })
    res.status(201).json({ message: "User URLs Fetch Success", result })
})
exports.adminUserDelete = asyncHandler(async (req, res) => {
    const { userId } = req.params
    await User.findByIdAndDelete(userId)
    res.status(201).json({ message: "User Delete Success" })
})