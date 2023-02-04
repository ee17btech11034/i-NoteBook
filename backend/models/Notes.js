const mongoose = require('mongoose')
const {Schema} = mongoose

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    tag: {          //college ka hai ya to-do list ka hai. 
        type: String
    },
    date: {
        type: Date,
        default: Date.now //Isko date.now() aise krke function nhi banana. Ham ise baad me run krenge. 
    },
})

module.exports = mongoose.model('notes', NotesSchema)