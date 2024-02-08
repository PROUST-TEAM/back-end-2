import express from "express";
import asyncHandler from "express-async-handler";

import { perfumePreview, categoryPreview, perfumeWrite, perfumeDelete, perfumeReadUser, perfumeRead, perfumeLike } from "../controllers/perfume.controller.js";
import { isAuth } from "../middlewares/jwt.js";

export const perfumeRouter = express.Router({ mergeParams: true });

perfumeRouter.get("/getPerfumes", asyncHandler(perfumePreview));
perfumeRouter.get("/getCategories", asyncHandler(categoryPreview));
perfumeRouter.post("/write/:UserID", isAuth, asyncHandler(perfumeWrite));
perfumeRouter.delete("/delete/:UserID/:Content", isAuth, asyncHandler(perfumeDelete));
perfumeRouter.get("/readUser", asyncHandler(perfumeReadUser));
perfumeRouter.get("/read", asyncHandler(perfumeRead));

perfumeRouter.patch("/likePerfumes/:UserID", isAuth, asyncHandler(perfumeLike));
