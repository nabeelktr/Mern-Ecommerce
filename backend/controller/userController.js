import AsyncHandler from 'express-async-handler'
import otpGenerator from "otp-generator";
import User from '../modals/userModal.js';
import generateToken from '../utils/generateToken.js';


const generateOTP = AsyncHandler(async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });
  
        if (user) {
        throw new Error("User exists");
        }
      // Generate the OTP
      
      const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
  
      // Store the OTP in req.app.locals
      req.app.locals.OTP = otp;
  
      console.log('OTP generated successfully:', otp);
      next();
    } catch (err) {
      console.error('Error generating OTP:', err);
      // Handle the error, e.g., send an error response
      res.status(400).json({ error: 'Failed to generate OTP' });
    }
  });


  const registerUser = AsyncHandler(async (req, res) => {
   
    const { email,name,password,phone } = req.body.values;
    const admin=false;
   
  
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      admin
    });
  
    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        
        // token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid userData");
    }
});

const authUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email: email });

    if (user && !user.admin ) {
      if((await user.matchPassword(password))){

      
      res.json({
        user,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("invalid password");
    }
  }else{
    res.status(402)
    throw new Error("Invlaid user");
  }  
  });
  

  export{generateOTP,registerUser,authUser}