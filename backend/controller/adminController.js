import AsyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";
import Product from "../modals/productModal.js";


const adminAuth = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && user.admin) {
    if ((await user.matchPassword(password))) {
      res.json({
        user,
        token: generateToken(user._id),
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
    $and:[
      {
        admin: false,
      },
      {
        $or:[
          {
            name: { $regex: new RegExp(req.body.name, 'i') }
          },
          {
            phone: { $regex: new RegExp(req.body.name, 'i') }
          },
          {
            email: { $regex: new RegExp(req.body.name, 'i') }
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

const addProduct =AsyncHandler(async(req,res) => {
  const {name, description, price, offerPrice, category, color, size, qty, gender} = req.body.values;
  const newProduct = await Product.create({
    name,
    description,
    price,
    offerPrice,
    category,
    color,
    size,
    qty,
    gender,
    images: req.body.urls
  });
  if (newProduct) {
    res.status(201).json({msg:'uploaded'})
  }else{
    throw new Error('invalid Product');
  }
});

const getProducts = AsyncHandler(async(req,res) => {
  let products;
  if (req.params.id != null){
    products = await Product.findById(req.params.id);
  }else{
    products = await Product.find();
  }
  if (products) {
    res.status(201).json(products)
  }else{
    res.status(401)
    throw new Error('Product fetching error')
  }
});

const editProduct = AsyncHandler(async (req, res) => {
  console.log(req.body);
  const {name, description, price, offerPrice, category, color, size, qty, gender} = req.body.values;
  const user = await Product.findByIdAndUpdate(req.params.id, {
    name,
    description,
    price,
    offerPrice,
    category,
    color,
    size,
    qty,
    gender,
    images: req.body.images,
  })
  if (user) {
    res.status(201).json({ msg: 'updated..' })
  } else {
    throw new Error('Invalid Error')
  }
})

export { adminAuth, getUsers, UpdateUser, searchUser, addProduct, getProducts, editProduct };
