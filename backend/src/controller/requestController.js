const studentRequest = require("../model/requestModel");

const createRequest = async (req, res) => {
  try {
    const { reqName, subject, description, fees } = req.body;
    if (!reqName || !subject || !description || !fees) {
      res.status(400);
      throw new Error("Please Fill All The Fields");
    }

    var reqData = {
      reqName,
      studentName: req.user._id,
      subject,
      description,
      fees,
    };
    const data = await studentRequest.create(reqData);

    const requestData = await studentRequest
      .findOne({ _id: data._id })
      .populate("studentName", "-password");
    res.status(200).send(requestData);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

const updateRequest = async (req, res) => {
  try {
    const { requestId, requestName, subject, description, fees } = req.body;
    
    const data = await studentRequest.find({ studentName: { $eq: req.user._id } });
    if (data) {
      const updateData = await studentRequest.findByIdAndUpdate(
         requestId ,
        {
          requestName,
          subject,
          description,
          fees,
        },
        {
          new: true,
        }
      ).populate('studentName','-password');
      res.status(200).send(updateData);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { reqId } = req.body;

    const validData = await studentRequest.find({ studentName: { $eq: req.user._id } })

    if(validData){
        const delData = await studentRequest.deleteOnes(reqId);
        res.status(200).send(delData);
    }

    else{
        console.log("this is not your request");
    }

  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getAllRequests = async (req, res) => {
  try {
    const reqData = await studentRequest
      .find({ studentName: { $eq: req.user._id } })
      .populate("studentName", "-password")
      .populate("reqName")
      .populate("subject")
      .populate("description")
      .populate("fees").sort({'updatedAt':-1})

      res.status(200).send(reqData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = { createRequest, updateRequest, deleteRequest,getAllRequests };
