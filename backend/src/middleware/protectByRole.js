const accessByRole = (req,res,next)=>{
    if(req.user.role === 'admin') next();

    else if(req.user.role === 'student' ||req.user.role === 'Student') next();
    // else if(req.user.role === 'student') next();

    else if(req.user.role === 'tutor') next();

    else{
        // res.redirect('/');
        console.log("Your not authorized");
    }
}

module.exports = {accessByRole};