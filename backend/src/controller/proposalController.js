const tutorProposal = require("../model/proposalModel");

const createProposal = async (req, res) => {
  try {
    const { status, description, requestId, fees } = req.body;
    if (!requestId || !description || !fees) {
      res.status(400);
      throw new Error("Please Fill All The Fields");
    }

    var reqData = {
      requestId,
      tutorName: req.user._id,
      status,
      description,
      fees,
    };
    const data = await tutorProposal.create(reqData);

    const requestData = await tutorProposal
      .findOne({ _id: data._id })
      .populate("tutorName", "-password")
      .populate("requestId");
    res.status(200).send(requestData);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};
const getProposals = async (req, res) => {
  try {
    const reqData = await tutorProposal
      .find({ tutorName: { $eq: req.user._id } })
      .populate("tutorName", "-password")
      .populate("requestId")
      .populate("description")
      .populate("fees")
      .sort({ updatedAt: -1 });

    res.status(200).send(reqData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const updateProposal = async (req, res) => {
  try {
    const { updatedescription, updatefees } = req.body;
    const proposalId = req.query.updId;

    const updateData = await tutorProposal
      .findByIdAndUpdate(
        { _id: proposalId },
        {
          description: updatedescription,
          fees: updatefees,
        },
        {
          new: true,
        }
      )
      .populate("description")
      .populate("fees")
      .populate("tutorName", "-password")
      .populate("requestId");
    res.status(200).send(updateData);
    // }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const deleteProposal = async (req, res) => {
  try {
    const proposalId = req.query.dltId;

    const delData = await tutorProposal.deleteOne({ _id: proposalId });
    res.status(200).send(delData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const getAllProposals = async (req, res) => {
  try {
    const reqData = await tutorProposal
      .find()
      .populate("tutorName", "-password")
      .populate("requestId")
      .populate("description")
      .populate("fees")
      .sort({ updatedAt: -1 });

    res.status(200).send(reqData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const getSpecificReqPro = async (req, res) => {
  try {
    const requestId = req.query.reqId;
    // const id = 
    const data = await tutorProposal
      .find({requestId:requestId })
      .populate("tutorName", "-password")
      .populate("requestId")
      .populate("description")
      .populate("fees")
      .sort({ updatedAt: -1 });

      res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
module.exports = {
  createProposal,
  getProposals,
  updateProposal,
  deleteProposal,
  getAllProposals,
  getSpecificReqPro
};
