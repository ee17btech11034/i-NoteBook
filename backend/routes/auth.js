const express = require('express')
const User = require('../models/User')
const router = express.Router()

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'ThisisJWT_SECRET'

// Router 1: Create a user using post "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),   //ye custom msg show krega.
    body('password').isLength({ min: 6})
    ] , async (req, res)=>{
        //if there are errors, return bad requests and errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        //check if user exists already 
        let user  = await User.findOne({email: req.body.email}) 
        if (user){
          return res.status(400).json({error: "Oops! this email is already present."})
        }

        try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds); //isme await ki jarurat nhi bcz sync use kr rha hai ye
        const SecPass = bcrypt.hashSync(req.body.password, salt);

        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPass,
          })
         
         const data = {
            user:{
              id: user.id
            }
         }
         const authToken = jwt.sign(data, JWT_SECRET);

         res.json({authToken})
        } 
        catch (error){
          console.error(error.message)
          res.status(500).send("Internal server error")
        }
})

// Router 2: Login a user using post "/api/auth/login". 
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),   //ye custom msg show krega.
  body('password', 'Password can not be blank').exists()
  ] , async (req, res)=>{
      //if there are errors, return bad requests and errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const {email, password} = req.body; 
      let success=false
 
      try {

      let user  = await User.findOne({email}) 
      if (!user){
        // return res.status(400).json({error: "Oops! this user does not present."}) // but agar koi hacker daal raha hai to me usko kyo batau ki kya galat hai. user hai ki nhi. 
        return res.status(400).json({success, error: "Enter correct credentials!"}) 
      }

      //ab me password ko hash se compare krunga 
      const comparePass = await bcrypt.compare(password, user.password) //true / false return krta hai.      

      if (!comparePass) {
        return res.status(400).json({success, error: "Enter correct credentials!"})
      }

      const data = {
          user:{
            id: user.id
          }
       }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true

      res.json({success, authToken})
      } 
      catch (error){
        console.error(error.message)
        res.status(500).send("Internal server error")
      }
})


// Router 3 : Get logged in user details using post: "/api/auth/getuser" . login required 
router.post('/getuser', fetchuser, async (req, res)=>{

  try{
    const userId = req.user.id //ye fetch user wali file se hai.
    const user = await User.findById(userId).select("-password") //me kah raha hu ki userId se user ki detils nikalo but password mat nikalo 
    res.send(user)
  } catch (error){
        console.error(error.message)
        res.status(500).send("Internal server error")
  }
})
module.exports = router