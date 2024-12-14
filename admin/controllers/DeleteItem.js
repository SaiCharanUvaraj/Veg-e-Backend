import itemModel from "../models/ItemSchema.js";

const deleteItem = async(item)=>{
    try
    {
      await itemModel.findOneAndDelete({item})
    }
    catch (error)
    {
      console.error('Error in deleting item: ', error);
    }
};

export default deleteItem;