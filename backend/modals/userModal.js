import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const addressSchema = mongoose.Schema({
    name:{
        type: String,
    },
    phone: {
        type: String,
    },
    pincode: {
        type: String
    },
    address: {
        type: String
    },
    location: {
        type: String
    },
    district: {
        type: String
    },
    state: {
        type: String
    }
})

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:Object,
    },
    gender:{
        type:String,
    },
    location:{
        type:String,
    },
    active:{
        type:Boolean,
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean
    },
    shippingAddress: [addressSchema],
    status: {
        type: String,
        enum: ["Online", "Offline"]
    },
    socket_id: {
        type: String,
    },
    friends: [
        {
            type: String,
            ref: 'User',
        }
    ]
   
},
{
    timestamps:true
}
)


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema)

export default User;
