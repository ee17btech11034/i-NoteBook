const connectToMongo = require('./db')
const express = require('express')

const port = 5000

connectToMongo()
const app = express()

app.use(express.json())  //req.body ka use krne ke liye mujhe is middleware ka use krna padega. 

//All routes 
app.use('/api/auth', require('./routes/auth'))   //first wala http wala path hai and 2nd wala file path hai.
app.use('/api/notes', require('./routes/notes'))   

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})