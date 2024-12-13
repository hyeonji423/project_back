const database = require("../database/database");
const path = require("path");
const ROOT_PATH = "http://localhost:8000";

exports.postMyMedi = async (request, response) => {
  try {
    let {
      mediName,
      companyName,
      buyingDate,
      expDate,
      mainSymptom,
      memo,
      user_id,
      notification
    } = request.body;

    // 날짜 형식 검증 및 변환
    if (buyingDate) {
      buyingDate = new Date(buyingDate);
      if (isNaN(buyingDate.getTime())) {
        return response.status(400).json({ msg: "구입날짜 형식이 올바르지 않습니다." });
      }
    }

    if (expDate) {
      expDate = new Date(expDate);
      if (isNaN(expDate.getTime())) {
        return response.status(400).json({ msg: "유효기간 형식이 올바르지 않습니다." });
      }
    }

    // 필수 입력값 검증
    if (!mediName || !expDate || !user_id) {
      return response.status(400).json({ 
        msg: "필수 입력값이 누락되었습니다. (제품명, 유효기간, 사용자 ID는 필수입니다)" 
      });
    }

    // PostgreSQL의 TIMEZONE 설정
    await database.pool.query("SET timezone = 'Asia/Seoul'");

    const sanitizedData = [
      mediName,
      companyName || null,
      buyingDate || null,
      expDate,
      mainSymptom || null,
      memo || null,
      user_id,
      notification
    ];

    await database.pool.query(
      "INSERT INTO mymedicine (medi_name, company_name, buying_date, exp_date, main_symptom, memo, user_id, notification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      sanitizedData
    );

    return response.status(201).json({ msg: "약품이 성공적으로 등록되었습니다." });
  } catch (error) {
    return response.status(500).json({ msg: "약품정보 입력 오류: " + error });
  }
};