import AsyncHandler from 'express-async-handler'
import otpGenerator from "otp-generator";
import User from '../modals/userModal.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import Cart from '../modals/CartModal.js';
import mongoose from 'mongoose';
import WishList from '../modals/wishListModal.js';
import Wallet from '../modals/walletModal.js';
import Product from '../modals/productModal.js';





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


const getFilters = AsyncHandler(async (req, res) => {
  if(req.params){
  let products;
  if (req.params.category) {
    products = await Product.find({ category: req.params.category });

  } else if (req.params.gender) {
    products = await Product.find({ gender: req.params.gender });
  }
  if (products.length) {
    res.status(201).json(products)
  } else {
    res.status(404)
    throw new Error('Product fetching error')
  }
}else {
  res.status(404)
  throw new Error('No params error')
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
      const refresh = generateRefreshToken(user._id);

      res.cookie('jwt', refresh, { httpOnly: true, secure: true });

      res.json({
        accessToken: generateAccessToken(user._id),
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

const updatePassword = AsyncHandler(async (req, res) => {
  console.log(req.body);
  const password = req.body.current;
  const user = await User.findById(req.user._id);
  if ((await user.matchPassword(password))) {
    console.log('matched');
    user.password = req.body.newPassword;
    user.save();
    res.status(201).json({ msg: 'password reset success' })
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

const addToExistingCArt = AsyncHandler(async (existingCart, newItem, userId) => {
  const existingProduct = existingCart.items.find((prdt) => (prdt.productId === newItem.productId && prdt.size === newItem.size))

  if (existingProduct) {
    await Cart.updateOne({ userId: userId, 'items.productId': newItem.productId, 'items.size': newItem.size }, { $inc: { 'items.$.qty': 1 } });
  } else {
    existingCart.items.push(newItem);
    await existingCart.save();
  }
});

const getCartItems = AsyncHandler(async (req, res) => {
  const items = await Cart.findOne({ userId: req.user._id });
  if (items) {
    res.status(201).json(items);

  } else {
    res.status(402).json({ msg: 'No items in the cart' });
    throw new Error('No items in the cart');
  }
});

const updateCartQty = AsyncHandler(async (req, res) => {
  const item = req.body.item
  const cart = await Cart.findById(req.params.id)
  if (cart) {
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
    res.status(201).json({ msg: 'updated' });
  } else {
    res.status(402)
    throw new Error('cart not found');
  }
});

const updateCartQtyDec = AsyncHandler(async (req, res) => {
  const item = req.body.item
  const cart = await Cart.findById(req.params.id)
  if (cart) {
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
    res.status(201).json({ msg: 'updated' });
  } else {
    res.status(402)
    throw new Error('cart not found');
  }
});

const test = AsyncHandler(async (req, res) => {
  try {
    const table = await Cart.aggregate([
      {
        $match: {
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
        $lookup: {
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
    res.status(201).json({ table });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const removeCartItem = AsyncHandler(async (req, res) => {
  const item = req.body.item
  const cart = await Cart.updateOne(
    { _id: new mongoose.Types.ObjectId(req.params.id) },
    {
      $pull: {
        items: {
          productId: item.productId,
          size: item.size
        }
      }
    }
  );
  if (cart) {
    res.status(201).json({ msg: 'cart item removed' })
  } else {
    res.status(402)
    throw new Error('invalid cart')
  }
});

const addAddress = AsyncHandler(async (req, res) => {

  const newAddress = req.body;
  const resp = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { shippingAddress: newAddress },
    },
    { new: true }
  );
  if (resp) {
    res.status(201).json({ msg: "updated" })
  } else {
    res.status(402)
    throw new Error('invalid error')
  }
});

const editAddress = AsyncHandler(async (req, res) => {
  const updatedAddress = req.body;

  const resp = await User.updateOne(
    {
      _id: new mongoose.Types.ObjectId(req.user._id),
      'shippingAddress._id': new mongoose.Types.ObjectId(updatedAddress._id),
    },
    {
      $set: {
        'shippingAddress.$[elem]': updatedAddress,
      },
    },
    {
      arrayFilters: [{ 'elem._id': new mongoose.Types.ObjectId(updatedAddress._id) }],
    }
  );

  if (resp) {
    res.status(201).json({ success: true })
  } else {
    res.status(402)
    throw new Error('invalid Error')
  }
});

const getUserAddress = AsyncHandler(async (req, res) => {
  const address = await User.find({ _id: new mongoose.Types.ObjectId(req.user._id) }, { shippingAddress: 1 })
  res.status(201).json({ address })
});

const removeAddress = AsyncHandler(async (req, res) => {
  const resp = await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      shippingAddress: { _id: new mongoose.Types.ObjectId(req.params.id) }
    }
  })
  res.status(201).json({ msg: 'deleted' })
});

const getUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(201).json(user)
  } else {
    res.status(404)
    throw new Error('invalid user')
  }
});

const editUser = AsyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body.values)
  res.json({ msg: 'updated' })
});

const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, secure: true })

  res.json({ message: 'Cookie cleared' })
};

const addToWishlist = AsyncHandler(async (req, res) => {

  if (req.body._id) {
    const wishlist = await WishList.create({
      userId: req.user._id,
      productId: req.body._id,
    })
    if (wishlist) {
      res.status(201).json({ success: true })
    }
  } else {
    res.status(403)
    throw new Error('invalid error')
  }
});

const getWishlist = AsyncHandler(async (req, res) => {

  const wishlist = await WishList.find({ userId: req.user._id }).populate('productId');
  if (wishlist) {
    res.status(201).json(wishlist)
  } else {
    res.status(402)
    throw new Error('invalid error')
  }
});

const userwishlist = AsyncHandler(async (req, res) => {
  const wishlist = await WishList.find({ userId: req.user._id }, { productId: 1, _id: 0 })
  if (wishlist) {
    const productIdArray = wishlist.map(item => item.productId);
    res.status(201).json(productIdArray)
  } else {
    res.status(402)
    throw new Error('invalid error')
  }
});

const removeWishlist = AsyncHandler(async (req, res) => {
  if (req.body.wishlistId) {
    await WishList.findByIdAndDelete(req.body.wishlistId)
    res.status(201).json({ success: true })
  } else {
    res.status(402)
    throw new Error('invalid error')
  }
});

const getWallet = AsyncHandler(async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.user._id });
  res.status(201).json(wallet)
});

const addBalance = AsyncHandler(async (req, res) => {
  if (req.body.amount) {
    const wallet = await Wallet.findOne({ userId: req.user._id });
    wallet.balance += parseInt(req.body.amount);
    wallet.transactions.push({
      date: Date.now(),
      status: 'Credited',
      amount: req.body.amount,
    })
    await wallet.save();
    res.status(201).json({ success: true });
  } else {
    res.status(402);
    throw new Error('invalid error')
  }
})


export {
  generateOTP, registerUser, authUser, AddToCart, getCartItems, updateCartQty, updateCartQtyDec, test, removeCartItem,
  addAddress, getUserAddress, removeAddress, getUser, editUser, updatePassword, logout, editAddress, addToWishlist,
  getWishlist, userwishlist, removeWishlist, getWallet, addBalance, getFilters
}