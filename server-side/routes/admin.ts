import express = require("express");
import adminController = require("../controllers/admin");
import authorization = require("../middlewares/authorization");

const { authorizeUser, isAdmin } = authorization;

const router = express.Router();

const {
  blockAUser,
  unblockAUser,
  getAllCreatives,
  getAllCustomers,
  getAllUsers,
  getCreative,
  getCustomer,
  giveSuperCreativeTag,
  createAdminAccount,
  adminSignIn,
} = adminController;

router.post("/createAdminAccount", createAdminAccount);

router.post("/adminSignIn", adminSignIn);

router.get("/getAllCreatives", authorizeUser, isAdmin, getAllCreatives);

router.get("/getAllCustomers", authorizeUser, isAdmin, getAllCustomers);

router.get("/getAllUsers", authorizeUser, isAdmin, getAllUsers);

router.get("/getCreative", authorizeUser, isAdmin, getCreative);

router.get("/getCustomer", authorizeUser, isAdmin, getCustomer);

router.patch("/blockAUser", authorizeUser, isAdmin, blockAUser);

router.patch("/unblockAUser", authorizeUser, isAdmin, unblockAUser);

router.patch(
  "/giveSuperCreativeTag",
  authorizeUser,
  isAdmin,
  giveSuperCreativeTag
);

export = router;
