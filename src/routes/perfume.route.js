import express from "express";
import asyncHandler from "express-async-handler";

import { perfumePreview, categoryPreview, perfumeWrite } from "../controllers/perfume.controller.js";
// import { perfumePreview, categoryPreview } from "../controllers/perfume.controller.js";
import { isAuth } from "../middlewares/jwt.js";

export const perfumeRouter = express.Router({ mergeParams: true });

perfumeRouter.get("/getPerfumes", asyncHandler(perfumePreview));
perfumeRouter.get("/getCategories", asyncHandler(categoryPreview));
perfumeRouter.post("/write/:UserID", isAuth, asyncHandler(perfumeWrite));
