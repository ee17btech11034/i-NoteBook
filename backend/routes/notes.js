const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//Route 1: Fetch all notes using Get : "/api/auth/fetchallnotes" . login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
    
        res.json(notes)
    } catch (error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

//Route 2: Add new note using Post : "/api/auth/addnewnote" . login required
router.post('/addnewnote', fetchuser, [
    body('title', 'Title must be atleast 3 characters').isLength({min:3}),
    body('description', 'Description must be atleast 5 characters').isLength({min:5}),
    
    ], async (req, res)=>{
        //if there are errors, return bad requests and errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        try {
            const {title, description, tag} = req.body; 
            const note = new Notes({
                user: req.user.id, title, description, tag
            })

            const savednote = await note.save()

            res.json(savednote)
        } catch (error){
            console.error(error.message)
            res.status(500).send("Internal server error")
        }
})

//Route 3: Update an existing note using Put : "/api/auth/updatenote" . login required 
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
        
    const {title, description, tag} = req.body;  

    //create a new Notes object 
    const newNote = {}
    if (title){newNote.title = title} //user ne jo bhi chije add kri hai unhi ko add kro is new Note ne.
    if (description){newNote.description = description}
    if (tag){newNote.tag = tag}
        
        
    //find the note to be updated and update it. 
    //But before this we need to verify the user that jo update kr rha hai usi  ke notes hai na ye. 

    try {
        let note = await Notes.findById(req.params.id) //ye params wali id wahi hai jo router me put ke baad likhi hai. 

        //agar note na ho to 
        if (!note){
            return res.status(404).send("Not Found")
        }

        //verify user 
        if (note.user.toString() != req.user.id){
            return res.status(401).send("Not allowed")
        }

        //ab agar sab kuch sahi hai to me note ko update kr skta hu 
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true}) //new batata hai ki nhi hai to bana dena note
        res.json(note)
    } catch (error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

//Route 4: Delete an existing note using Delete: "/api/auth/deletenote" . login required 
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
        
        
    //find the note to be deleted and delete it. 
    //But before this we need to verify the user that jo delete kr rha hai usi ke  notes hai na ye. 

    try {

        let note = await Notes.findById(req.params.id) //ye params wali id wahi hai jo router me put ke baad likhi hai. 

        //agar note na ho to 
        if (!note){
            return res.status(404).send("Not Found")
        }

        //verify user 
        if (note.user.toString() != req.user.id){
            return res.status(401).send("Not allowed")
        }

        //ab agar sab kuch sahi hai to me note ko update kr skta hu 
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted"})

    } catch (error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})
module.exports = router