import { Router } from "express";
import { getGeminiResult } from "../controllers/gemini.controller.js";

const router = Router();

router.get("/get-result", getGeminiResult);



export default router;