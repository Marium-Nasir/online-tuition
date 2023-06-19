const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    reqName:{type:String,required:true},
    studentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    fees: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const requestModel = new mongoose.model("requestModel", requestSchema);

module.exports = requestModel;
