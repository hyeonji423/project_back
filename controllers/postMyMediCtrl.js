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
    } = request.body;

    console.log(
      mediName,
      companyName,
      buyingDate,
      expDate,
      mainSymptom,
      memo,
      user_id
    ); // body에 들어온 값 확인

    await database.pool.query(
      "INSERT INTO mymedicine (medi_name, company_name, buying_date, exp_date, main_symptom, memo, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [ mediName, companyName, buyingDate, expDate, mainSymptom, memo, user_id]
    );

    return response.status(201).json({ msg: "약품이 성공적으로 등록되었습니다." });
  } catch (error) {
    return response.status(500).json({ msg: "약품정보 입력 오류: " + error });
  }
};
