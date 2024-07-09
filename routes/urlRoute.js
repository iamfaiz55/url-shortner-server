const { getLogUrl, getUserUrl } = require("../controller/urlController")

const router = require("express").Router()

router
    .get("/:shortUrl", getLogUrl)
    .get("/userUrl/:userId", getUserUrl)


module.exports = router