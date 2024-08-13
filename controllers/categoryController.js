import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if(!name.trim){
        return res.json({error:"Name is required"});
    }
    const existingCategory=await Category.findOne({name});
    if(existingCategory){
        return res.json({error:"Category already exist"});
    }

    const category=await new  Category({name}).save();
    res.json(category);

  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateCategory=asyncHandler(async (req,res)=>{

try{
  const {name}=req.body;
  const {categoryId}=req.params;
  const category=await Category.findOne({_id:categoryId})
  if(!category){
    res.status(404).json({error:"Category not found"});
  }
 category.name=name;

  const updatedCategory=await category.save();
  res.json(updatedCategory);

}catch(err){
    console.log(err);
    res.status(400).json({err:"internal server error"});
}
})

const deleteCategory=asyncHandler(async(req,res)=>{
    try{
     const {categoryId}=req.params;
     const category=await Category.findById({_id:categoryId});
     console.log(category)
     if(!category){
        res.status(404).json({error:"Category not found"});
     }
     const deletedCategory=await category.deleteOne();
     res.json(deletedCategory)
    }
    catch(err){
        console.log(err);
        res.status(400).json({err:"Internal Server Error"});
    }
})

const listCategory=asyncHandler(async(req,res)=>{
    try{
        const all=await Category.find({});
        res.json(all);
    }catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

const readCategory=asyncHandler(async(req,res)=>{
   try{
    const category=await Category.findOne({_id:req.params.id})
    res.json(category);
   }catch(err){
    console.log(err)
        res.status(400).json(err);
   }
})
export {
  createCategory,updateCategory,deleteCategory,listCategory,readCategory

};