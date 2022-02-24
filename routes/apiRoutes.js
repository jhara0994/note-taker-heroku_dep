const fs = require("fs")
const router = require("express").Router()
const uuid = require("uuid")
const util = require('util')

// helper variables
const readFromFile = util.promisify(fs.readFile)
const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            parsedData.forEach((note, index) => {
                if(note.id === id) {
                    parsedData.splice(index, 1)
                }
            })

            writeToFile(file, parsedData)
        }

    })
}



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