const asyncHandler = require("express-async-handler")
const Url = require("../models/Url")
const User = require("../models/User")

exports.getLogUrl = asyncHandler(async (req, res) => {
    const { shortUrl } = req.params
    const result = await Url.findOne({ shortUrl })
    if (!result) {
        return res.status(400).json({ message: "Invalid Code" })
    }
    await Url.findByIdAndUpdate(result._id, { count: result.count + 1 })
    res.status(200).json({ message: "Url Fetch Success", result: result.longUrl })
})


exports.getUserUrl = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const result = await User.findOne({ userId })
    res.status(200).json({ message: "user URL Fetch Success", result })
})