const jwt = require('jsonwebtoken'); 
const JWT_SECRET = 'ThisisJWT_SECRET'

const fetchuser = (req, res, next)=>{
    //Get the user from the JWT token and add id to req object 
    const token = req.header('auth-token')

    if (!token){
        res.status(401).send({error: "Please authenticate using validate token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET) //ye verify krta hai token ko
        req.user = data.user
        next()  // ye router.post ke call back function ko call krega.
    } catch (error){
        res.status(401).send({error: "Please authenticate using validate token"})
    }
}

module.exports = fetchuser;