import express from "express";
import asyncHandler from "express-async-handler";

import { perfumePreview, categoryPreview } from "../controllers/perfume.controller.js";

export const perfumeRouter = express.Router({ mergeParams: true });

perfumeRouter.get("/getPerfumes", asyncHandler(perfumePreview));
perfumeRouter.get("/getCategories", asyncHandler(categoryPreview));
