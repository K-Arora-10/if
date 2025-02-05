const jwt = require('jsonwebtoken');
const JWT_secret = "I@am$@esKApe"


const fetchcompany = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token)
    {
        res.status(401).send('Please authenticate using a valid token')
    }

    try {
        const data =  jwt.verify(token,JWT_secret);
        req.company=data.company;
        next()
    } catch (error) {
        res.status(401).send('Please authenticate using a valid token')
    }
}

module.exports=fetchcompany;