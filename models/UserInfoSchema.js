import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        fname: { type: String, required: true },
        lname: {type: String, required: true },
    },
    dob: {
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
    history: {
        type: Array,
        default: []
    },
    cart: {
        type: Array,
        default: []
    }
});

const userInfoModel = mongoose.model("User Information", userInfoSchema);

export default userInfoModel;
