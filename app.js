const express = require("express");
const cors = require("cors");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// API 라우트 설정
app.use("/api", searchRoutes); // '/api' 프리픽스 추가

// 서버 상태 확인용 라우트
app.get("/", (req, res) => {
  res.send("서버가 정상적으로 실행중입니다.");
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
