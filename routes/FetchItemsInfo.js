import express from "express";
import itemModel from "../models/ItemSchema.js";

const fetchItemsInfo=express.Router();

fetchItemsInfo.get('/fetch-items-info',async(req,res) =>{
    try
    {
        const items= await itemModel.find({});
        res.status(200).json({success:true, data:items});
    }
    catch (error) 
    {
        res.status(200).json({success:false});
    }
});

export default fetchItemsInfo;