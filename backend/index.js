//index.js working as a express server

const connectToMongo=require('./db')
const express = require('express')


connectToMongo()//connecting to mongodb


//bring the server connecting code from express js website hello world section

const app = express()
const port = 5000




//configuring routes

app.use(express.json())//needed access req.body,without this command we cannot access to req.body

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => { //listenning server to given port no.
  console.log(`Example app listening at http://localhost:${port}`)
})
