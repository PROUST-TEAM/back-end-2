import SwaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    info: {
      title: "PROUST API",
      version: "1.0.0",
      description: "PROUST API with express, API 설명",
    },
    components: {
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
    servers: [
      {
        url: "http://dev.proust.store",
        description: "API 서버",
      },
      {
        url: "http://localhost:3000",
        description: "로컬호스트",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};

export const specs = SwaggerJsdoc(options);
