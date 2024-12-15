import express from "express";
const router=express.Router();

import { login,signup } from "../controllers/authController.js";
import { createCompany ,getAllCompanies} from "../controllers/companyController.js";
import { createQuestion, getAllQuestions } from "../controllers/questionsController.js";
import {isAdmin, authenticateToken } from "../middleware/Middleware.js";

router.get("/company/get", getAllCompanies);
router.get("/questions/get", getAllQuestions);

router.post("/login", login);
router.post("/signup", signup);
router.post("/company/create", createCompany);
router.post("/question/create",createQuestion);


export default router;