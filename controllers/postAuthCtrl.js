const database = require("../database/database");
const { v4: uuid4 } = require('uuid');
const bcrypt = require('bcrypt')

exports.postAuth = async(request, response) => {
  const {username, email, password} = request.body

  console.log(username, email, password);

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

exports.postLogin = async(request, response) => {
  const { email, password } = request.body
  // console.log(email, password);

  // 1. 이메일 존재 여부 확인
  // 2. 비밀번호 복호화 → 비밀번호 일치 여부 확인
  // 3. 회원정보 jsonwebtoken 생성
}