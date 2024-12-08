const database = require("../database/database");

exports.updateMyMedi = async (request, response) => {
  const {
    mediName,
    companyName,
    buyingDate,
    expDate,
    mainSymptom,
    memo,
    user_id,
    id
  } = request.body;

  console.log(
    mediName,
    companyName,
    buyingDate,
    expDate,
    mainSymptom,
    memo,
    user_id,
    id
  ); // body에 들어온 값 확인

  try {
    await database.pool.query(
      "UPDATE mymedicine SET medi_name = $1, company_name = $2, buying_date = $3, exp_date = $4, main_symptom = $5, memo = $6, user_id = $7 WHERE id = $8",
      [mediName, companyName, buyingDate, expDate, mainSymptom, memo, user_id, id]
    );

    return response.status(201).json({ msg: "나의 약품 목록이 수정되었습니다." });
  } catch (error) {
    return response.status(500).json({ msg: "데이터 입력 에러: ", error });
  }
};