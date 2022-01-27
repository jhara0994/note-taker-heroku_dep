const express = require('express')
const fs = require('fs')
const path = require('path')
const uuid = require('./helpers/uuid')
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils')
const { json } = require('express/lib/response')
const { noteInput } = require('./db/db.json')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get('/api/notes', (req, res) => res.json(noteInput))
app.get('/api/notes/:note_id', (req, res) => res.json(noteInput))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} New note added`)

    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title, 
            text,
            id: uuid()
        }
        noteInput.push(newNote)

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                const note = JSON.parse(data)
                note.push(newNote)
                fs.writeFile('./db/db.json', JSON.stringify(note, null, 2),
                (writeErr) => writeErr ? console.error(writeErr) : console.info ('Note was successfully added'))
            }
        })
        const response = {
            status: 'success',
            body: newNote,
        }
        console.log(response)
        
        res.status(201).json(response)
    }
})

app.delete ('/api/notes/:id', (req,res) => {
    let jsonFilePath = path.join(__dirname, './db/db.json')

    readFromFile('./db/db.json').then((data) => {
        const delNote = JSON.parse(data)
        for (let i=0; i < delNote.length; i++) {
            if (delNote[i].id == req.params.id) {
                noteInput.splice(i, 1)
                break
            }

        fs.writeFile(jsonFilePath, JSON.stringify(noteInput, null, 2),function (err) {
            if (err) {
                return console.log(err)
            } else {
                console.log('The note has been deleted')
            }
        })
        res.json(noteInput)
        }
    })
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})