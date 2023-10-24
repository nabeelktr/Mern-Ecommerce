import AsyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";


const adminAuth = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email: email });

    if (user && user.admin ) {
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

  export {adminAuth}