const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  getAllUsers,
} = require("../controller/userController");
const { createRequest,updateRequest, deleteRequest,getAllRequests,getAllRequestsForAll} = require("../controller/requestController");
const { createProposal,getProposals ,updateProposal,deleteProposal,getAllProposals,getSpecificReqPro} = require("../controller/proposalController");
const {accessByStudent,accessByAdmin,accessByTutor,accessByStudentOrAdmin,accessByTutorOrAdmin} = require("../middleware/protectByRole");
const protect = require("../middleware/protect");

// for login And Signup
router.route("/").post(registerUser).get(protect, getAllUsers);
router.route("/login").post(login);

// for Student Request
router.route("/createrequest").post(protect, accessByStudent,createRequest);
router.route("/getallrequests").get(protect, accessByStudent,getAllRequests);
router.route("/updaterequest").patch(protect, accessByStudentOrAdmin, updateRequest);
router.route("/deleterequest").delete(protect,accessByStudentOrAdmin,deleteRequest);
router.route("/getproposalforstu").get(protect,accessByStudent, getSpecificReqPro);


// for tutor Proposals
router.route("/createproposal").post(protect, accessByTutor, createProposal);
router.route("/getproposals").get(protect, accessByTutor, getProposals);
router.route("/updateproposal").patch(protect, accessByTutorOrAdmin, updateProposal);
router.route("/deleteproposal").delete(protect,accessByTutorOrAdmin, deleteProposal);


//for admin
router.route("/getallrequestsforall").get(protect,accessByTutorOrAdmin, getAllRequestsForAll);
router.route("/getallproposalsforall").get(protect,accessByAdmin,getAllProposals);
module.exports = router;
