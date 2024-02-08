import SwaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    info: {
      title: "PROUST API",
      version: "1.0.0",
      description: "PROUST API with express, API 설명",
    },
    host: "localhost:3000",
    basepath: "../",
    securityDefinitions: {
      // 보안 정의 추가
      BearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};

export const specs = SwaggerJsdoc(options);
