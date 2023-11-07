import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../modals/userModal.js';
import RefreshToken from '../modals/tokenModal.js';
import { generateAccessToken } from '../utils/generateToken.js';

const protect = AsyncHandler(async (req, res, next) => {
  let token;
   try{
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = await User.findById(decoded.id).select('-password')
        
          if (req.user === undefined) {
            res.status(401).json({msg: 'No user found..'})
             throw new Error('Not Autherized')
          }else{
            next();
          }
      
        } catch (error) {

            res.status(401).json({msg: 'Not authorized..'})
            throw new Error('Not authorized, token failed');
      
          }
  });

  const protectRefreshToken = AsyncHandler(async (req,res) => {

    const token = req.body.newToken;
   
    try{
      const refreshToken = await RefreshToken.findOne({token: token})
      if(refreshToken){
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err,tokenDetails) => {
          if(err){
            localStorage.removeItem('userRefreshToken')
            res.status(402).json({msg: 'Not authorized..'})
          }
        })
        const accessToken = generateAccessToken(refreshToken.userId);
        res.status(201)
          .json(accessToken)

      }
    }catch(error){
      localStorage.removeItem('userRefreshToken')
      res.status(402).json({msg: 'Not authorized..'})
    }
    
  })
  
  export { protect, protectRefreshToken };