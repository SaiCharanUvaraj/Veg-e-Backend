import express from "express";
import itemModel from "../models/ItemSchema.js";

const fetchItems=express.Router();

fetchItems.get('/fetch-items',async(req,res) =>{
    try
    {
        const items= await itemModel.find({}).select('item');
        const itemNames = items.map(item => item.item);
        res.status(200).json(itemNames);
    }
    catch (error) 
    {
        console.error('Error in fetching items:', error);
        res.status(200).json({ error: 'Internal Server Error' });
    }
});

export default fetchItems;