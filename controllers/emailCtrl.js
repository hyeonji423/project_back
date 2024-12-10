const nodemailer = require("nodemailer");

exports.emailCtrl = async (req, res) => {
  const { title, content, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codelab2005@gmail.com", // 보내는 사람 이메일
      pass: "code3228**", // 이메일 비밀번호 또는 앱 비밀번호
    },
  });

  const mailOptions = {
    from: "codelab2005@gmail.com",
    to: "codelab2005@gmail.com", // 수신자 이메일
    subject: "사용자 건의사항",
    text: `사용자 이메일: ${email}\n\n건의사항: ${title}\n${content}`,
  };

  try {
    await sendEmail(title, content, email);
    res.status(200).send("이메일 전송 성공");
  } catch (error) {
    res.status(500).send("이메일 전송 실패");
  }

  
};
