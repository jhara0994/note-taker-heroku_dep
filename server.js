const express = require('express')
const apiRoutes = require('./routes/apiRoutes')
const homeRoutes = require('./routes/index')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.use('/api', apiRoutes)
app.use('/', homeRoutes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})