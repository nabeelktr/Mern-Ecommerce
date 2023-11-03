import AsyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import Product from "../modals/productModal.js";
import Category from "../modals/categoryModal.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";


const adminAuth = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && user.admin) {
    if ((await user.matchPassword(password))) {
      const refreshToken = generateRefreshToken(user._id)
    console.log(refreshToken);
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
  console.log(req.body);
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
})

export { adminAuth, getUsers, UpdateUser, searchUser, addProduct, getProducts,
  editProduct, deleteProduct, editProductFirebase, addCategory, getCategories,
  deleteCategory, editCategory };
