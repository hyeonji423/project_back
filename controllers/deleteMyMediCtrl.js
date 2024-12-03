const database = require("../database/database");

exports.deleteMyMediList = async (request, response) => {
  const mediId = request.params.mediId;

  try {
    const result = await database.pool.query(
      "DELETE FROM mymedicine WHERE medicine_id = $1",
      [mediId]
    );
    return response.status(200).json({ msg: "Delete My Medicine List Success" });
  } catch (error) {
    return response.status(500).json({ msg: "Delete My Medicine List Fail: ", error });
  }
};
