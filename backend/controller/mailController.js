import AsyncHandler from 'express-async-handler';
import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'
import 'dotenv/config';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Wyntra",
    link: "https://google.com/",
  },
});

const registerMail = AsyncHandler(async (req, res) => {
  const { name, email: userEmail } = req.body;
  var email = {
    body: {
      name: name,
      intro:

        `Your OTP for register Wyntra website is ${req.app.locals.OTP}`,
      outro:
        "Please reach us if you have any queries",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "OTP Verification",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ code: req.app.locals.OTP });

    })
    .catch((error) => {
      res.status(500)
      throw new Error("mail error")
    })
  console.log('success mail');
});


export { registerMail }