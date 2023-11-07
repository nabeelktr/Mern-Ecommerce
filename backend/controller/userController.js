import AsyncHandler from 'express-async-handler'
import otpGenerator from "otp-generator";
import User from '../modals/userModal.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import Cart from '../modals/CartModal.js';
import Product from '../modals/productModal.js';
import mongoose from 'mongoose';

import RefreshToken from '../modals/tokenModal.js';




const generateOTP = AsyncHandler(async (req, res, next) => {
  try {
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

  const { email, name, password, phone } = req.body.values;
  const admin = false;
  const active = true;


  const newUser = await User.create({
    name,
    email,
    phone,
    password,
    admin,
    active,
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

  if (user && !user.admin && user.active) {
    if ((await user.matchPassword(password))) {
       const refresh = await refreshToken(user._id)
      res.json({
        user,
        accessToken: generateAccessToken(user._id),
        refreshToken: refresh,
      });
    } else {
      res.status(403)
      throw new Error("invalid password");
    }
  } else {
    res.status(402)
    throw new Error("Invlaid user");
  }
});

const refreshToken = async(userId) => {
  const existingToken = await RefreshToken.findOne({userId: new mongoose.Types.ObjectId(userId)});
  if (existingToken){
    await RefreshToken.deleteOne({userId: new mongoose.Types.ObjectId(userId)});
  }

  const refreshToken = generateRefreshToken(userId)
  await new RefreshToken({ userId, token: refreshToken}).save();
  return refreshToken;
}


const updatePassword = AsyncHandler(async(req,res) => {
  console.log(req.body);
  const password =  req.body.current;
  const user =await User.findById(req.user._id);
  if ((await user.matchPassword(password))) {
    console.log('matched');
    user.password = req.body.newPassword;
    user.save();
    res.status(201).json({msg: 'password reset success'})
  } else {
    res.status(403)
    throw new Error("invalid password");
  }

})

const AddToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const newItem = req.body;
    
    const existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      addToExistingCArt(existingCart, newItem, userId);
    } else {
      const cart = new Cart({
        userId,
        items: [newItem],
      });
      await cart.save();
    }

    res.status(201).json({ msg: 'Added to cart' });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
    throw new Error(error)
  }
};

const addToExistingCArt = AsyncHandler(async(existingCart, newItem, userId) => {
  const existingProduct = existingCart.items.find((prdt) => (prdt.productId === newItem.productId && prdt.size === newItem.size))

  if (existingProduct) {
    await Cart.updateOne({userId: userId, 'items.productId': newItem.productId, 'items.size': newItem.size}, {$inc: {'items.$.qty': 1}});
  }else{
    existingCart.items.push(newItem);
    await existingCart.save();
  }
});

const getCartItems = AsyncHandler(async(req,res) => {
  const items = await Cart.findOne({userId: req.user._id});
  if (items) {
    res.status(201).json(items);
 
  }else{
    res.status(402).json({msg: 'No items in the cart'});
    throw new Error('No items in the cart');
  }
});

const updateCartQty = AsyncHandler(async(req,res) => {
  const item = req.body.item
  const cart =await Cart.findById(req.params.id)
  if(cart){
    await Cart.updateOne(
      {
        userId: req.user._id,
        'items.productId': item.productId,
        'items.size': item.size
      },
      {
        $inc: { 'items.$[elem].qty': 1 }
      },
      {
        arrayFilters: [{ 'elem.productId': item.productId, 'elem.size': item.size }]
      }
    );
    res.status(201).json({msg: 'updated'});
  }else{
    res.status(402)
    throw new Error('cart not found');
  }
});

const updateCartQtyDec = AsyncHandler(async(req,res) => {
  const item = req.body.item
  const cart =await Cart.findById(req.params.id)
  if(cart){
    await Cart.updateOne(
      {
        userId: req.user._id,
        'items.productId': item.productId,
        'items.size': item.size
      },
      {
        $inc: { 'items.$[elem].qty': -1 }
      },
      {
        arrayFilters: [{ 'elem.productId': item.productId, 'elem.size': item.size }]
      }
    );
    res.status(201).json({msg: 'updated'});
  }else{
    res.status(402)
    throw new Error('cart not found');
  }
});


const test = AsyncHandler(async (req, res) => {
  try {
    const table = await Cart.aggregate([
      {
        $match:{
          _id: new mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $unwind: "$items"
      },
      {
        $addFields: {
          productIdObjectId: {
            $toObjectId: "$items.productId",
          },
        },
      },
      {
        $lookup:{
          from: "products",
          localField: "productIdObjectId",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      {
        $unwind: "$itemDetails"
      }
     
    ])
    res.status(201).json({  table });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const removeCartItem = AsyncHandler(async(req,res) => {
  const item = req.body.item
  const cart =await Cart.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, {
    $pull: {
      items: {
        $and: [
          {productId: item.productId},
          {size: item.size}
        ]
      }
    }
  })
  if(cart) {
    res.status(201).json({msg: 'cart item removed'})
  }else{
    res.status(402)
    throw new Error('invalid cart')
  }
});

const addAddress = AsyncHandler(async(req,res) => {

  const newAddress = req.body;
  const resp = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { shippingAddress: newAddress },
    },
    { new: true }
  );
  if(resp){
    res.status(201).json({msg: "updated"})
  }else{
    res.status(402)
    throw new Error('invalid error')
  }
});

const getUserAddress = AsyncHandler(async(req,res) => {
  const address = await User.find({_id: new mongoose.Types.ObjectId(req.user._id)}, {shippingAddress: 1})
  res.status(201).json({address})
});

const removeAddress = AsyncHandler(async(req,res) => {
  const resp = await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      shippingAddress: {_id: new mongoose.Types.ObjectId(req.params.id)}
    }
  })
  res.status(201).json({msg: 'deleted'})
});

const getUser = AsyncHandler(async(req,res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(201).json(user)
  }else {
    res.status(404)
    throw new Error('invalid user')
  }
});

const editUser = AsyncHandler(async(req,res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body.values )
  res.json({msg: 'updated'})
})


export { generateOTP, registerUser, authUser, AddToCart, getCartItems, updateCartQty, updateCartQtyDec, test, removeCartItem,
  addAddress, getUserAddress, removeAddress, getUser, editUser, updatePassword }