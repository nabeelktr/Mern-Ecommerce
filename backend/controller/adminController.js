import AsyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import Product from "../modals/productModal.js";
import Category from "../modals/categoryModal.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import mongoose from "mongoose";
import Order from "../modals/orderModal.js";
import Coupon from "../modals/couponModal.js";


const adminAuth = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && user.admin) {
    if ((await user.matchPassword(password))) {
      const refreshToken = generateRefreshToken(user._id)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/refresh',
      });
      res.status(200).json({
        user,
        accessToken: generateAccessToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("invalid password");
    }
  } else {
    res.status(402)
    throw new Error("Invlaid user");
  }
});

const refresh = AsyncHandler(async(req,res) => {

})

const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find({ admin: false }).select('-password')
  if (users) {
    res.status(201).json(users)
  } else {
    throw new Error('Invalid error')
  }
});

const UpdateUser = AsyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  if (user) {
    res.status(201).json({ msg: 'updated..' })
  } else {
    throw new Error('Invalid Error')
  }
})

const searchUser = AsyncHandler(async (req, res) => {
  const users = await User.find({
    $and: [
      {
        admin: false,
      },
      {
        $or: [
          {
            name: { $regex: new RegExp(req.body.name, 'i') }
          },
          {
            phone: { $regex: new RegExp(req.body.name, 'i') }
          },
          {
            email: { $regex: new RegExp(req.body.name, 'i') }
          },
          {
            _id:  new mongoose.Types.ObjectId(req.body.name) 
          },
        ]
      }
    ]
  })
  if (users) {
    res.status(201).json(users)
  } else {
    throw new Error('Invalid error')
  }
})

const addProduct = AsyncHandler(async (req, res) => {
  const { name, description, price, offerPrice, category, color, gender,subCategory } = req.body.values;
  const newProduct = await Product.create({
    name,
    description,
    price,
    offerPrice,
    category,
    color,
    variants: req.body.variants,
    gender,
    images: req.body.urls,
    subCategory, 
  });
  if (newProduct) {
    res.status(201).json({ msg: 'uploaded' })
  } else {
    throw new Error('invalid Product');
  }
});

const getProducts = AsyncHandler(async (req, res) => {
  let products;
  if (req.params.id != null) {
    products = await Product.findById(req.params.id);

  } else {
    products = await Product.find();
  }
  if (products) {
    res.status(201).json(products)
  } else {
    res.status(404)
    throw new Error('Product fetching error')
  }
});

const editProduct = AsyncHandler(async (req, res) => {
  const { name, description, price, offerPrice, category, color, gender, subCategory } = req.body.values;
  const user = await Product.findByIdAndUpdate(req.params.id, {
    name,
    description,
    price,
    offerPrice,
    category,
    color,
    gender,
    variants: req.body.variants,
    images: req.body.images,
    subCategory,
  })
  if (user) {
    res.status(201).json({ msg: 'updated..' })
  } else {
    throw new Error('Invalid Error')
  }
})

const deleteProduct = AsyncHandler(async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

const editProductFirebase = AsyncHandler(async (req, res) => {
  const result = await Product.findByIdAndUpdate(req.params.id, {
    images: req.body
  })
  if (result) {
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

const addCategory = AsyncHandler(async (req, res) => {
  const existingCategory = await Category.findOne({ name: req.body.name });
  if (existingCategory) {
    res.status(400).json({ msg: 'Category already exists' });
  } else {
    const category = await Category.create({
      name: req.body.name,
      image: req.body.image,
    });

    if (category) {
      res.status(201).json({ msg: 'Category added' });
    } else {
      res.status(400).json({ msg: 'Invalid category data' });
    }
  }
});

const deleteCategory = AsyncHandler(async (req, res) => {
  try {
    const result = await Category.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getCategories = AsyncHandler(async (req, res) => {
  let categories;
  if (req.params.id != null) {
    categories = await Category.findById(req.params.id);
  } else {
    categories = await Category.find();
  }
  if (categories) {
    res.status(201).json(categories)
  } else {
    res.status(404)
    throw new Error('category fetching error')
  }
});

const editCategory = AsyncHandler(async (req, res) => {
  const user = await Category.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    image: req.body.image,
  })
  if (user) {
    res.status(201).json({ msg: 'updated..' })
  } else {
    throw new Error('Invalid Error')
  }
});

const summary = AsyncHandler(async (req, res) => {
  const totalUser = User.find({admin: false}).count();
  const totalOrder = Order.find({status: 'Delivered'}).count();
  const totalProduct = Product.find().count();
  const totalOfferPrice = Order.aggregate([
    {
      $match: {
        status: 'Delivered'
      },
    },

    {
      $group: {
        _id: null,
        totalOfferPrice: {$sum: '$totalOfferPrice'}
      }
    },
   
    {
      $project: {
        _id : 0,
        totalOfferPrice: 1,
      }
    }
  ]);
 
  const [totalUsers, totalOrders, totalPrice, totalProducts] = await Promise.all([
    totalUser,
    totalOrder,
    totalOfferPrice,
    totalProduct,
  ]);
  res.status(201).json({totalUsers, totalOrders, totalPrice, totalProducts})
});

const summaryFilter = AsyncHandler(async (req, res) => {
  if (req.body) {
    const summaryResult = await Order.aggregate([
      {
        $match: {
          status: 'Delivered',
          createdAt: {
            $lte: new Date(req.body.endDate),
            $gte: new Date(req.body.startDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalPrice: { $sum: '$totalOfferPrice' },
        },
      },
      {
        $project: {
          _id: 0,
          totalOrders: 1,
          totalPrice: 1,
        },
      },
    ]);

    const { totalOrders, totalPrice } = summaryResult[0] || { totalOrders: 0, totalPrice: 0 };

    res.status(201).json({ totalOrders, totalPrice });
  } else {
    res.status(402);
    throw new Error('Invalid error');
  }
});

const addCoupon = AsyncHandler(async (req,res) => {
  const { couponCode, startDate, percentage, expiry, minRate, maxRate } = req.body;
  const code = couponCode.toUpperCase();
  
  const existcode = await Coupon .findOne({couponCode: code})
  if (existcode){

    res.status(403);
    throw new Error('coupon exists')
  }else{
   
    const coupon = await Coupon.create({
      couponCode: code,
      startDate: new Date(startDate),
      percentage,
      expiry : new Date(expiry),
      minRate,
      maxRate,
    })
  
    if(coupon){
      res.status(201).json({success: true});
    }else{
      res.status(402)
      throw new Error('Invalid error')
    }
  }
});

const getCoupon = AsyncHandler(async (req, res) => {
  let coupon;
  if (req.params.id != null) {
    coupon = await Coupon.findById(req.params.id);
  } else {
    coupon = await Coupon.find();
  }
  if (coupon) {
    res.status(201).json(coupon)
  } else {
    res.status(404)
    throw new Error('coupon fetching error')
  }
});

const getUserCoupon = AsyncHandler(async(req,res) => {
  const coupons = await Coupon.find({
    $or: [
      {usedBy: null},
      {usedBy: {$ne: req.user._id}}
    ]
  })
  res.status(201).json(coupons)
})


export { adminAuth, getUsers, UpdateUser, searchUser, addProduct, getProducts,
  editProduct, deleteProduct, editProductFirebase, addCategory, getCategories,
  deleteCategory, editCategory, summary, addCoupon, getCoupon, getUserCoupon, summaryFilter };
