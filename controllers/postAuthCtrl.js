const database = require("../database/database");
const { v4: uuid4 } = require('uuid');
const bcrypt = require('bcrypt')

exports.postAuth = async(request, response) => {
  const {username, email, password} = request.body

  try {
    const result = await database.pool.query('SELECT * FROM users WHERE email = $1', [email])
    // console.log(result.rows);

    if(result.rows.length > 0) {
      return response.status(200).json({msg: '이미 존재하는 이메일 입니다.', success: false})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    // console.log(hashPassword);
    await database.pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashPassword])

    return response.status(201).json({msg: '회원가입이 완료되었습니다.'})
  }
  catch (error) {
    return response.status(500).json({msg: '회원정보 입력 오류 : '+error})
  }
}