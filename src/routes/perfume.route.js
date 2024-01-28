import express from "express";
import asyncHandler from "express-async-handler";

import { perfumePreview } from "../controllers/perfume.controller.js";

export const perfumeRouter = express.Router({ mergeParams: true });

perfumeRouter.get("/getPerfumes", asyncHandler(perfumePreview));
