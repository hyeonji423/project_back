const nodemailer = require("nodemailer");
require("dotenv").config();

exports.emailCtrl = async (req, res) => {
  const { title, content, email, category } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: "이메일 주소가 필요합니다." 
    });
  }
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: `[건의사항] ${category} - ${title}`,
    text: `
          카테고리: ${category}
          제목: ${title}
          내용: ${content}

          이 메일은 자동발송됩니다.
           `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ 
      success: true, 
      message: "건의사항이 성공적으로 전송되었습니다." 
    });
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return res.status(500).json({ 
      success: false, 
      message: "이메일 전송에 실패했습니다." 
    });
  }
};
