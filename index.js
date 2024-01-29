import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { response } from "./config/response.js";
// import { tempRouter } from "./src/routes/temp.route.js";
import { perfumeRouter } from "./src/routes/perfume.route.js";
import { BaseError } from "./config/error.js";
import { status } from "./config/response.status.js";
import { specs } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";

dotenv.config();
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// server setting - veiw, static, body-parser etc..
app.set("port", process.env.PORT || 3000); // 서버 포트 지정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(express.static("uploads")); // 'uploads'는 이미지 파일이 저장된 디렉토리 경로
const UserRoutes = require("./src/routes/user");

//app.use(session({secret:'my secret',resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", UserRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// app.use("/temp", tempRouter);
app.use("/:PerfumeID", perfumeRouter);

app.listen(3000);
