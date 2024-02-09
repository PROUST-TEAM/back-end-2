import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import path from "path";
import bodyParser from "body-parser";
import { response } from "./config/response.js";
import cookieParser from 'cookie-parser';
import { UserRoutes } from "./src/routes/user.route.js";
import { perfumeRouter } from "./src/routes/perfume.route.js";
import { perfumeListRouter } from "./src/routes/perfumeList.route.js";
import { BaseError } from "./config/error.js";
import { status } from "./config/response.status.js";
import { specs } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";
import session from "express-session";

dotenv.config();
const app = express();

// server setting - veiw, static, body-parser etc..
app.set("port", process.env.PORT || 3000); // 서버 포트 지정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(express.static("uploads")); // 'uploads'는 이미지 파일이 저장된 디렉토리 경로

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 5 * 60 * 1000 }  // 세션 만료 시간을 5분으로 설정
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// swagger
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


app.get("/", (req, res) => {
  console.log("/");
  res.send("Add url '/api-docs' to test Swagger!");
});

// app.use("/temp", tempRouter);
app.use("/user", UserRoutes);
app.use("/:Name", perfumeRouter);
app.use("/perfumeList", perfumeListRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  // res.status(500).send(err.stack);
  // 템플릿 엔진 변수 설정
  res.locals.message = err.message;
  // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  console.error("Error data:", err.data);
  // res.status(err.data.status).send(response(err.data));
  res.status(err.status || 500).send(response(err.data || { message: "Internal Server Error" }));
});

app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`);
});
