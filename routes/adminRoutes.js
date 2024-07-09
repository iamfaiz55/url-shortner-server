const { AdmingetAllUsers, adminUpdateUser, adminGetUserUrls, adminUserDelete } = require("../controller/adminController")

const router = require("express").Router()

router
    .get("/get-users", AdmingetAllUsers)
    .put("/update-user/:userId", adminUpdateUser)
    .get("/user/url/:userId", adminGetUserUrls)
    .delete("/user-delete/:userId", adminUserDelete)

module.exports = router