const fs = require("fs")
const router = require("express").Router()
const uuid = require("uuid")

// GET route to pull /notes onto the page.
router.get("/notes", (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    res.json(data)
})

// POST route to input new message. 
router.post("/notes", (req, res) => {
    const newNote = req.body
    newNote.id = uuid()

    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    data.push(newNote)

    fs.writeFileSync('../db/db.json', 'utf8')
    res.json(data)
})




// GET route to pull in notes
// router.get("/", (req, res) => {
//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
// })

// POST route to create new note
// router.post("/", (req, res) => {
//     const {title, text} = req.body

//     if (title && text) {
//         const newNote = {
//             title, 
//             text,
//             id: uuid(),
//         }

//         readAndAppend(newNote, './db/db.json')
//         res.json(`Note added!`)
//     } else {
//         res.error(`Note was not added`)
//     }
// })

// DELETE route to clear unnecessary notes
// router.delete("/notes:id", (req, res) => {
//     let noteId = req.params.id.toString()
//     readAndDelete(noteId,'./db/db.json')

//     res.json("Note has successfully been deleted.")
// })

module.exports = router