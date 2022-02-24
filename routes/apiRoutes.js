const fs = require("fs")
const router = require("express").Router()
const uuid = require("uuid")

// GET route to pull in notes
router.get("/notes", (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    console.log("Returning logged notes" + JSON.stringify(data))
    res.json(data)
})

// POST route to create new note
router.post("/notes", (req, res) => {
    const newNote = req.body
    newNote.id = uuid()
    
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    data.push(newNote)

    fs.writeFileSync("./db/db.json", JSON.stringify(data))
    console.log("New note has been added")

    res.json(data)
})

// DELETE route to clear unnecessary notes
router.delete("/notes:id", (req, res) => {
    let noteId = req.params.id.toString()
    readAndDelete(id,'./db/db.json', JSON.stringify(noteId))
    

    console.log("Note has successfully been deleted.")

    res.json(newData)
})

module.exports = router