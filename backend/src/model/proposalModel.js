const mongoose = require("mongoose");
const proposalSchema = new mongoose.Schema(
  {
    tutorName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    status:{
       type:String,
       default:"pending",
    },
    requestId: 
      { type: mongoose.Schema.Types.ObjectId, ref: "requestModel"},
    
    description: { type: String, required: true },
    fees: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const proposalModel = new mongoose.model("proposalModel", proposalSchema);

module.exports = proposalModel;
