import express from "express";
import asyncHandler from "express-async-handler";
import { Search, Recommend } from "../controllers/ai.controller.js";

export const AIRoutes = express.Router();

AIRoutes.post("/search", asyncHandler(Search));
AIRoutes.get("/recommend", asyncHandler(Recommend));
