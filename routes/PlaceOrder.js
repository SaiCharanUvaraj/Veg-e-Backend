import express from "express";
import orderModel from "../models/OrderSchema.js";
import userInfoModel from "../models/UserInfoSchema.js";
const placeOrder=express.Router();

placeOrder.post('/place-order', async(req,res) =>{
    const {name,phone,address,cart,amount,id,date}=req.body;
    try 
    {
        const newOrder = await orderModel.create({ name, phone, address, cart, amount, id, date });
        if(!newOrder)
            return res.status(200).json({success:false});
        const userInfo = await userInfoModel.findOne({ phone });
        if (!userInfo)
            return res.status(200).json({success:false});
        userInfo.cart = [];
        const history=userInfo.history;
        userInfo.history=[...history,{cart,amount,id,date}];
        await userInfo.save();
        res.status(200).json({success:true});
    } 
    catch (error) 
    {
        console.error("Error in placing order: ", error);
        res.status(200).json({success:false});
    }
});
export default placeOrder;