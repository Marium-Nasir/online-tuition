const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  getAllUsers,
} = require("../controller/userController");
const { createRequest,updateRequest, deleteRequest,getAllRequests  } = require("../controller/requestController");
const { createProposal } = require("../controller/proposalController");
const { accessByRole } = require("../middleware/protectByRole");
const protect = require("../middleware/protect");

// for login And Signup
router.route("/").post(registerUser).get(protect, getAllUsers);
router.route("/login").post(login);

// for Student Request
router.route("/createrequest").post(protect, accessByRole, createRequest);
router.route("/getallrequests").get(protect, accessByRole, getAllRequests);
router.route("/updaterequest").put(protect, accessByRole, updateRequest);
router.route("/deleterequest").delete(protect, accessByRole, deleteRequest);

// for tutor Proposals
router.route("/createproposal").post(protect, accessByRole, createProposal);

module.exports = router;
