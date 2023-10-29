import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../modals/userModal.js';

const protect = AsyncHandler(async (req, res, next) => {
  let token;
   try{
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password')
        
          if (req.user === undefined) {
            res.status(401).json({msg: 'No user found..'})
             throw new Error('Not Autherized')
          }else{
            next();
          }
      
        } catch (error) {
            console.error(error);
            res.status(401).json({msg: 'Not authorized..'})
            throw new Error('Not authorized, token failed');
      
          }
  });
  
  export { protect };