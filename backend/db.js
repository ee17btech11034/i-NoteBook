const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/inotebook"

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{        //ye call back function se deal krunga and usse return karwaunga
            console.log("Successfully connected to  my MongoDB")
    })
}

module.exports = connectToMongo;