//index.js working as a express server

const connectToMongo=require('./db')
const express = require('express')
var app = express()
var cors = require('cors')


connectToMongo()//connecting to mongodb


//bring the server connecting code from express js website hello world section

const port = 5000



app.use(cors())

//configuring routes

app.use(express.json())//needed access req.body,without this command we cannot access to req.body

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => { //listenning server to given port no.
  console.log(`EDiary backend listening at http://localhost:${port}`)
})
