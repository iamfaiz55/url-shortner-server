const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { userPRotected, adminPRotected } = require("./middlewares/protected")
require("dotenv").config({ path: "./.env" })

// data base
mongoose.connect(process.env.MONGO_URL)
const app = express()


// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "*",
    credentials: true
}))

// routes
app.use("/api/v1/auth", require("./routes/authRoute"))
app.use("/api/v1/user", userPRotected, require("./routes/userRoutes"))
app.use("/api/v1/url", require("./routes/urlRoute"))
app.use("/api/v1/admin", adminPRotected, require("./routes/adminRoutes"))

// 404
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
})

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: err.message || "something wents wrong" })
})

// server

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log(`SERVER RUNNING: http://localhost:${process.env.PORT}`))
})