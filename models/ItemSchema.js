import mongoose from "mongoose";
const ItemSchema=new mongoose.Schema({
    item:{
      type: String,
      required: true,
      unique: true
    },
    type:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    url:{
      type: String,
      required: true
    },
  })
const itemModel=mongoose.model("Item",ItemSchema);
export default itemModel;