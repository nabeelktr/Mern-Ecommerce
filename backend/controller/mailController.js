import AsyncHandler from 'express-async-handler';
import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'hans.johnson@ethereal.email',
        pass: '3W5M96yuXZE4XJJakf'
    }
});

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

   const registerMail = AsyncHandler(async (req, res) => {
    const { name, email: userEmail } = req.body;
    var email = {
      body: {
        name: name ,
        intro:
          
          `Your OTP for register ecommerce website is ${req.app.locals.OTP}`,
        outro:
          "Please reach us if you have any queries",
      },
    };
  
    var emailBody = MailGenerator.generate(email);
  
    let message = {
      from: 'hans.johnson@ethereal.email',
      to: userEmail ,
      subject:  "OTP Verification",
      html: emailBody,
    };
  
    transporter
      .sendMail(message)
      .then(() => {
        return res
          .status(200)
          .json({ code:req.app.locals.OTP});
          
      })
      .catch((error)=>{
        res.status(500)
        throw new Error("mail error")
      })
    console.log('success mail');
  });


  export {registerMail}