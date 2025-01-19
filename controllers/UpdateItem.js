import itemModel from "../models/ItemSchema.js";
const updateItem = async(item,type,price,quantity,url) =>{
    try
    {
      await itemModel.findOneAndUpdate(
        {item},
        { 
            type, 
            price, 
            quantity,
            url
        },
        {new:true,upsert: true}
      )
    }
    catch (error)
    {
      console.error('Error in updating items: ', error);
    }
}
export default updateItem;