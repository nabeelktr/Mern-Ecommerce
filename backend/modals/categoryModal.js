import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: File,
        required: true,
    },
},
    {
        timeStamp: true
    }
)

const Category = mongoose.model('Category',categorySchema);

export default Category;
