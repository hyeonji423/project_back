const nodemailer = require("nodemailer");
require("dotenv").config();

exports.emailCtrl = async (req, res) => {
  const { title, content, email, category } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "이메일 주소가 필요합니다.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `[건의사항] ${category} - ${title}`,
    text: `
카테고리: ${category}
제목: ${title}
내용: ${content}
수신받을 이메일: ${email}

이 메일은 자동발송됩니다.
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "건의사항이 성공적으로 전송되었습니다.",
    });
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    console.error("자세한 에러:", error.message);
    return res.status(500).json({
      success: false,
      message: "이메일 전송에 실패했습니다.",
      error: error.message,
    });
  }
};

exports.notificationCtrl = async (req, res) => {
  try {
    const { userId, mediName, expDate, notificationDate, email, isActive } =
      req.body;

    if (!email || !mediName || !expDate || !notificationDate) {
      return res.status(400).json({
        success: false,
        message: "필수 정보가 누락되었습니다.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.naver.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `[알림] ${mediName} 유효기간이 7일 남았습니다`,
      text: `
안녕하세요.
등록하신 의약품 "${mediName}"의 유효기간이 7일 남았음을 알려드립니다.

- 의약품명: ${mediName}
- 유효기간: ${new Date(expDate).toLocaleDateString()}

안전한 의약품 사용을 위해 유효기간을 확인해주세요.

이 메일은 자동발송됩니다.
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "알림 설정이 완료되었습니다.",
    });
  } catch (error) {
    console.error("알림 설정 실패:", error);
    return res.status(500).json({
      success: false,
      message: "알림 설정에 실패했습니다.",
      error: error.message,
    });
  }
};
