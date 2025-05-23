import express from "express";
import userInfoModel from "../models/UserInfoSchema.js";
import authToken from "../controllers/AuthToken.js";

const removeFromCart = express.Router();

removeFromCart.post('/remove-from-cart', authToken, async (req, res) => {
    try 
    {
        const { phone } = req.user;
        const cartItem= req.body;
        const userInfo = await userInfoModel.findOne({ phone });
        if (!userInfo)
            return res.status(200).json({success:false});
        const updatedCart = userInfo.cart.filter((item) => item.id !== cartItem.id);
        userInfo.cart = updatedCart;
        await userInfo.save();
        res.status(200).json({success: true});
    } 
    catch (error) 
    {
        res.status(200).json({success:false});
    }
});

export default removeFromCart;
