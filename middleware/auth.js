const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

const auth =  (req, res , next) => {

    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]

    if (!accessToken){
        return res.status(403).send("Invalid credentials")
    }

    let payload
    try{
        payload = jwt.verify(accessToken, JWT_AUTH_TOKEN)
        next()
    }
    catch(e){
        return res.status(401).send("You need login to access this page")
    }
}

module.exports = { auth }
