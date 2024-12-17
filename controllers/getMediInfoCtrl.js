const database = require("../database/database");

exports.searchMediInfo = async (request, response) => {
  const { term } = request.query;
  console.log(term);
  try {
    const results = await database.pool.query(
      "SELECT * FROM medi_info WHERE 효능 LIKE $1 OR 제품명 LIKE $1 LIMIT 20",
      [`%${term}%`]
    );

    return response.status(200).json(results.rows);
  } catch (error) {
    console.error("검색 오류:", error);
    return response.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

exports.getMediInfo = async (request, response) => {
  try {
    const results = await database.pool.query("SELECT * FROM medi_info LIMIT 50");

    return response.status(200).json(results.rows);
  } catch (error) {
    console.error("데이터베이스 오류 상세:", error);
    return response.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: error.message,
    });
  }
};
