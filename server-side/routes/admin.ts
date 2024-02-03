import express = require("express");
import adminController = require("../controllers/admin");

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
} = adminController;

router.get("/getAllCreatives", getAllCreatives);
router.get("/getAllCustomers", getAllCustomers);
router.get("/getAllUsers", getAllUsers);
router.get("/getCreative", getCreative);
router.get("/getCustomer", getCustomer);
router.patch("/blockAUser", blockAUser);
router.patch("/unblockAUser", unblockAUser);
router.patch("/giveSuperCreativeTag", giveSuperCreativeTag);

export = router;
