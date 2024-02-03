import Admin = require("../models/admin");
import { Request, Response } from "express";

const createAccount = async (req: Request, res: Response) => {};
const signIn = async (req: Request, res: Response) => {};
const blockUser = async (req: Request, res: Response) => {};
const unblockUser = async (req: Request, res: Response) => {};
const getAllUsers = async (req: Request, res: Response) => {};
const getAllCustomers = async (req: Request, res: Response) => {};
const getAllCreatives = async (req: Request, res: Response) => {};
const getCreative = async (req: Request, res: Response) => {};
const getCustomer = async (req: Request, res: Response) => {};
const giveSuperCreativeTag = async (req: Request, res: Response) => {};

export = {
  createAccount,
  signIn,
  blockUser,
  unblockUser,
  getAllCustomers,
  getAllCreatives,
  getAllUsers,
  getCreative,
  getCustomer,
  giveSuperCreativeTag,
};
