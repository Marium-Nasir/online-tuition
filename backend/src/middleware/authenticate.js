const jwt = require('jsonwebtoken');
const generateToken = (id)=>{
    return jwt.sign({id},process.env.jwtToken,{
        expiresIn:'3d'
    })
}

module.exports = generateToken;