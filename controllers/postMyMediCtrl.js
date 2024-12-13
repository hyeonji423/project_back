const database = require("../database/database");
const path = require("path"); // 경로 지정 모듈
const ROOT_PATH = "http://localhost:8000";

exports.postMyMedi = async (request, response) => {
 
  try {
    const {
      mediName,
      companyName,
      buyingDate,
      expDate,
      mainSymptom,
      memo,
      user_id,
      notification
    } = request.body;

    // console.log(
    //   mediName,
    //   companyName,
    //   buyingDate,
    //   expDate,
    //   mainSymptom,
    //   memo,
    //   user_id
    //   notification
    // ); // body에 들어온 값 확인

    // 필수 입력값 검증
    if (!mediName || !expDate || !user_id) {
      return response.status(400).json({ 
        msg: "필수 입력값이 누락되었습니다. (제품명, 유효기간, 사용자 ID는 필수입니다)" 
      });
    }

    // 선택적 입력값에 대한 기본값 설정
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
