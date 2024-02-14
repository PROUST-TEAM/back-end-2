// import express from "express";
// import asyncHandler from "express-async-handler";

// import { perfumePreview, categoryPreview, likePreview, perfumeWrite, perfumeDelete, perfumeReadUser, perfumeRead, perfumeLike } from "../controllers/perfume.controller.js";
// import { isAuth } from "../middlewares/jwt.js";

// export const perfumeRouter = express.Router({ mergeParams: true });

// perfumeRouter.get("/getPerfumes", asyncHandler(perfumePreview));
// perfumeRouter.get("/getCategories", asyncHandler(categoryPreview));
// perfumeRouter.get("/getLikes", isAuth, asyncHandler(likePreview));
// perfumeRouter.post("/write", isAuth, asyncHandler(perfumeWrite));
// perfumeRouter.delete("/delete/:Content", isAuth, asyncHandler(perfumeDelete));
// perfumeRouter.get("/readUser", asyncHandler(perfumeReadUser));
// perfumeRouter.get("/read", asyncHandler(perfumeRead));

// perfumeRouter.patch("/likePerfumes", isAuth, asyncHandler(perfumeLike));
