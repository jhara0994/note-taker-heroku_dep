const { builtinModules } = require("module")
const path = require("path")
const router = require("express").Router()

// GET route for homepage
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//GET route for note page
router.get("/notes", function (req,res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

// global GET route
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})
module.exports = router