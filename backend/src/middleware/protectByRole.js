const accessByAdmin = (req,res,next)=>{
    if(req.user.role === 'admin' || req.user.role === 'Admin') next();
    else{
     res.redirect('/')
    }
} 

const accessByStudent= (req,res,next)=>{
    if(req.user.role === 'student' || req.user.role === 'Student') next();
    else{
        res.redirect('/')
    }
}
const accessByStudentOrAdmin= (req,res,next)=>{
    if(req.user.role === 'student' || req.user.role === 'Student' || req.user.role === 'admin' || req.user.role === 'Admin') next();
    else{
        res.redirect('/')
    }
}

const accessByTutor = (req,res,next)=>{
    if(req.user.role === 'tutor' || req.user.role === 'Tutor') next();
    else{
        res.redirect('/')
    }
}

const accessByTutorOrAdmin = (req,res,next)=>{
    if(req.user.role === 'tutor' || req.user.role === 'Tutor' || req.user.role === 'admin' || req.user.role === 'Admin') next();
    else{
        res.redirect('/')
    }
}


module.exports = {accessByStudent,accessByAdmin,accessByTutor,accessByStudentOrAdmin,accessByTutorOrAdmin};