import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct=asyncHandler(async(req,res)=>{
    try{
   const {name,image,description,price,category,quantity,brand}=req.fields;
     switch(true){
        case !name:
            return res.json({error:"Name is required"});
            break;
        case !image:
        return res.json({error:"Image is required"});
        break;
        case !description:
            return res.json({error:"description is required"});
            break;
        case !price:
            return res.json({error:"price is required"});
            break;
        case !category:
            return res.json({error:"category is required"});
            break;
        case !quantity:
            return res.json({error:"quality is required"});
            break;
        case !brand:
            return res.json({error:"brand is required"});
            break;

        }
          
        const product=new Product({...req.fields});
        await product.save();
        res.json({product});
    }catch(err){
        res.status(400).json(err);
        res.status(400).json({err:"error occured in server while creating"});
    }
})

const updateProduct=asyncHandler(async(req,res)=>{
        try{
       const {name,image,description,price,category,quantity,brand}=req.fields;
         switch(true){
            case !name:
                return res.json({error:"Name is required"});
                break;
            case !image:
            return res.json({error:"Image is required"});
            break;
            case !description:
                return res.json({error:"description is required"});
                break;
            case !price:
                return res.json({error:"price is required"});
                break;
            case !category:
                return res.json({error:"category is required"});
                break;
            case !quantity:
                return res.json({error:"quality is required"});
                break;
            case !brand:
                return res.json({error:"brand is required"});
                break;
    
            }
              
            const product=await Product.findByIdAndUpdate(req.params.id,{...req.fields},{new:true});
            product.save();
            res.json({product});
        }catch(err){
            res.status(400).json(err);
            res.status(400).json({err:"error occured in server while updating"});
        }
    })

const deleteProduct=asyncHandler(async(req,res)=>{
  try{
    const product=await Product.findByIdAndDelete(req.params.id);
    res.json(product)
  }
  catch(err){
    console.log(err);
    res.status(400).json({err:"error occured in server while deleting"});
  }
})

const fetchProducts=asyncHandler(async(req,res)=>{
   try{
  const pageSize=6;
  const keyword=req.query.keyword
  ?{name : {regex: req.query.keyword,$options:"i"}}  
  : {};
      
  const count=await Product.countDocuments({...keyword})
  const products=await Product.find({...keyword}).limit({pageSize})

 res.json({
  products,
  page:1,
  pages:Math.ceil(count/pageSize),
  hasMore:false,
 });

   }catch(err){
    res.status(400).json({err:"error from server side while fetching products"});
    console.log(err);
   }
})

const fetchProductById=asyncHandler(async(req,res)=>{
    try{
      const product=await Product.findById(req.params.id);
     if(!product){
        res.status(404);
        throw new Error("Product not found");
     }else
        return res.json(product);
    }
    catch(err){
      console.log(err);
      res.status(400).json({err:"error occured in server while fetching product by id"});
    }
  })



  const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({})
        .populate("category")
        .limit(12)
        .sort({ createAt: -1 });
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
  const addProductReview = asyncHandler(async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.id);
  
      if (product) {
        const alreadyReviewed = product.reviews.find(
          (r) => r.user.toString() === req.user._id.toString()
        );
  
        if (alreadyReviewed) {
          res.status(400);
          throw new Error("Product already reviewed");
        }
  
        const review = {
          name: req.user.username,
          rating: Number(rating),
          comment,
          user: req.user.id,
        };
  
        product.reviews.push(review);
  
        product.numReviews = product.reviews.length;
  
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
  
        await product.save();
        res.status(201).json({ message: "Review added" });
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const fetchTopProducts=asyncHandler(async(req,res)=>{ 
   try{
    const products=await Product.find({}).sort({rating:-1}).limit(4);
    res.json(products);
   }catch(err){
    console.error(err);
    res.status(400).json({message:"Error occured while fetching top products"});
   }
  })

  const fetchNewProducts=asyncHandler(async(req,res)=>{
    try{
      const products=await Product.find({}).sort({_id:-1}).limit(5);
      res.json(products);
     }catch(err){
      console.error(err);
      res.status(400).json({message:"Error occured while fetching top products"});
     }
  })


  const filterProducts = asyncHandler(async (req, res) => {
    try {
      const { checked, radio } = req.body;
  
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
  
      const products = await Product.find(args);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
export {addProduct,updateProduct,deleteProduct,fetchProducts,fetchProductById,fetchAllProducts,addProductReview,fetchTopProducts,fetchNewProducts,filterProducts};