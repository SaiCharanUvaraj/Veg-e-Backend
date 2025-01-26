import mongoose from "mongoose";
const OrderSchema=new mongoose.Schema({
    name:{
        fname: { type: String, required: true },
        lname: {type: String, required: true }
    },
    phone: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        plot: { type: String, required: true },
        road: { type: String, required: true },
        locality: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pin: { type: String, required: true }
    },
    cart: {
        type: Array,
        required: true
    },
    amount:{
        type: String,
        required: true
    }
  })
const orderModel=mongoose.model("Order",OrderSchema);
export default orderModel;