const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const users = require('./routes/api/users')
const { checkToken } = require('./middleware/auth')


//middleWare
app.use(bodyParser.json())

app.use(checkToken)

// every time when we go to /api/users/ we got to middleware users
app.use('/api/users/', users)


const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const port = process.env.PORT || 3001
app.listen(port, ()=> {
    console.log(`Server running at ${port} port`)
})
