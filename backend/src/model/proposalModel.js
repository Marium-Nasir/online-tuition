const mongoose = require("mongoose");
const proposalSchema = new mongoose.Schema(
  {
    tutorName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status:{
       type:String,
       default:"pending",
    },
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    description: { type: String, required: true },
    fees: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const proposalModel = new mongoose.model("proposalModel", proposalSchema);

module.exports = proposalModel;
