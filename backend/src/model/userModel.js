const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fname:{type:String,requied:true},
    lname:{type:String,requied:true},
    phone:{type:String,requied:true},
    role:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},
{
    timestamps : true
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

const UserModel = new mongoose.model("UserModel",userSchema);

module.exports = UserModel;