const accessByAdmin = (req,res,next)=>{
    if(req.user.role === 'admin' || req.user.role === 'Admin') next();
    else{
        res.send("you are no able to this action")
    }
} 

const accessByStudent= (req,res,next)=>{
    if(req.user.role === 'student' || req.user.role === 'Student') next();
    else{
        res.send("you are no able to this action")
    }
}
const accessByStudentOrAdmin= (req,res,next)=>{
    if(req.user.role === 'student' || req.user.role === 'Student' || req.user.role === 'admin' || req.user.role === 'Admin') next();
    else{
        res.send("you are jhhj action")
    }
}

const accessByTutor = (req,res,next)=>{
    if(req.user.role === 'tutor' || req.user.role === 'Tutor') next();
    else{
        res.send("you are not eligible for this action")
    }
}

const accessByTutorOrAdmin = (req,res,next)=>{
    if(req.user.role === 'tutor' || req.user.role === 'Tutor' || req.user.role === 'admin' || req.user.role === 'Admin') next();
    else{
        res.send("you are not eligible hgghggghghghgh action")
    }
}


module.exports = {accessByStudent,accessByAdmin,accessByTutor,accessByStudentOrAdmin,accessByTutorOrAdmin};