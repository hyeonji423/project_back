const database = require("../database/database");
const bcrypt = require("bcrypt");

exports.updateAuth = async (request, response) => {
  const { email, password, birth_date } = request.body;

    
  try {

    const hashPassword = await bcrypt.hash(password, 10);

    await database.pool.query(
      "UPDATE users SET password = $1, birth_date = $2 WHERE email = $3",
      [
        hashPassword,
        birth_date,
        email
      ]
    );

    return response.status(201).json({ msg: "회원정보가 수정되었습니다." });
  } catch (error) {
    return response.status(500).json({ msg: "데이터 입력 에러: ", error });
  }
};