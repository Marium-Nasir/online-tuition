const jwt = require('jsonwebtoken');
const user = require('../model/userModel');

const protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const val = jwt.verify(token,process.env.jwtToken)

            req.user = await user.findById(val.id).select("-password");

            next();

        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    }
}

module.exports = protect