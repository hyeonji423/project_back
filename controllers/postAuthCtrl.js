const database = require("../database/database");
const { v4: uuid4 } = require("uuid"); // 랜덤 문자열 생성 모듈
const path = require("path"); // 경로 지정 모듈
const fs = require("fs"); // 파일 생성 등 컨트롤 모듈
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ROOT_PATH = "http://localhost:8000";

exports.postAuth = async (request, response) => {
  // const id = uuid4();
  const { email, password, birth_date } = request.body;

  // const profileImage = request.file;

  console.log(email, password, birth_date); // body에 들어온 값 확인

  try {
    const result = await database.pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // console.log(result.rows);

    if (result.rows.length > 0) {
      return response
        .status(200)
        .json({ msg: "이미 존재하는 이메일 입니다.", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    // let profileImagePath = null;

    // if (profileImage) {
    //   // body에 이미지가 들어오게 될 경우
    //   const imageExtension = path.extname(profileImage.originalname); // 확장자
    //   const imageFileName = `${uuid4()}${imageExtension}`; // ex) 1234567890.jpg
    //   profileImagePath = `${ROOT_PATH}/upload/${imageFileName}`;

    //   fs.writeFileSync(
    //     path.join(__dirname, "../upload", imageFileName),
    //     profileImage.buffer // 이미지 버퍼 형식으로 저장
    //   );
    // }

    await database.pool.query(
      "INSERT INTO users (email, password, birth_date) VALUES ($1, $2, $3)",
      [email, hashPassword, birth_date]
    );

    return response.status(201).json({ msg: "회원가입이 완료되었습니다." });
  } catch (error) {
    return response.status(500).json({ msg: "회원정보 입력 오류: " + error });
  }
};

exports.postLogin = async (request, response) => {
  const { email, password } = request.body;
  // console.log(email, password);

  try {
    // 1. 이메일 존재 여부 확인
    const result = await database.pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      // 이메일이 없는 경우
      return response
        .status(200)
        .json({ msg: "존재하지 않는 사용자 입니다.", success: false });
    }

    // 2. 비밀빈호 복호화, 비밀번호 일치 여부 확인
    const isMatch = await bcrypt.compare(password, result.rows[0].password); // 첫번째 파라미터는 입력 받은 비밀번호, 두번째 파라미터는 데이터베이스에 있는 암호화된 비밀번호 - 비교해서 맞으면 true, 틀리면 false

    if (!isMatch) {
      // 비밀번호가 틀린경우
      return response
        .status(200)
        .json({ msg: "비밀번호가 일치하지 않습니다.", success: false });
    }

    // 3. 회원정보 jsonwebtoken 생성
    // sign 함수: 첫번째 파라미터는 결과값, 두번째 파라미터는 시크릿키, 세번째 파라미터는 유효기간
    const token = jwt.sign(
      {
        id: result.rows[0].id,
        email: result.rows[0].email,
        username: result.rows[0].username,
        profile_img: result.rows[0].profile_img,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    // console.log(token);

    return response.status(201).json({ token, msg: "로그인 성공" });
  } catch (error) {
    return response.status(500).json({ msg: "로그인 실패: " + error });
  }
};
