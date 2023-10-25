import AsyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";


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

export { adminAuth, getUsers, UpdateUser,searchUser };