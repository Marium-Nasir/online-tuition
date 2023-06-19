const tutorProposal = require('../model/proposalModel');

const createProposal = async(req,res)=>{
    try{
        const {tutorName,subject,description,fees} = req.body;
        if(!tutorName||!subject||!description||!fees){
            res.status(400);
            throw new Error("Please Fill All The Fields")
        }
        const data = await tutorProposal.create({
           tutorName,
           subject,
           description,
           fees
        })
        res.status(201).json({
           _id:data._id,
           tutorName:data.tutorName,
           subject:data.subject,
           description:data.description,
           fees:data.fees
        })
    }catch(err){
       res.status(400).send(err)
    }
}

module.exports = {createProposal}