import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    offerPrice:{
        type:Number,
        required:true,
    },
    color:{
        type:Array,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    images:{
        type:Array,
        required:true,
    },
},
{
    timeStamp:true,
}
)

const Product = mongoose.model('Product', productSchema);

export default Product;