CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,            -- 자동 증가하는 기본 키
    email VARCHAR(100) UNIQUE NOT NULL,        -- 이메일 (고유 값)
    password VARCHAR(255) NOT NULL,   -- 비밀번호 (bcrypt 사용 예정)
    birth_date DATE NOT NULL,         -- 생년월일
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 생성 날짜
);

CREATE TABLE mymedicine (
    id SERIAL PRIMARY KEY,            -- 자동 증가하는 기본 키
    medi_name VARCHAR(255) NOT NULL,   -- 약품 이름
    company_name VARCHAR(255),         -- 회사 이름 (NULL 가능)
    buying_date DATE,                  -- 구매 날짜 (NULL 가능)
    exp_date INT NOT NULL,             -- 유효기간 (년 단위)
    main_symptom VARCHAR(255),         -- 주요 증상 (NULL 가능)
    memo TEXT,                         -- 메모 (NULL 가능)
    user_id INT,                       -- 사용자 ID (외래 키로 사용)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)  -- 사용자 ID 외래 키
);
