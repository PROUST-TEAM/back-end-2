import express from "express";
import asyncHandler from "express-async-handler";

import { perfumeList } from "../controllers/perfumeList.controller.js";
import { isAuth } from "../middlewares/jwt.js";

export const perfumeListRouter = express.Router({ mergeParams: true });

perfumeListRouter.get("/", isAuth, asyncHandler(perfumeList));
