import express  from "express";
import formidable from "express-formidable";
const router=express.Router();

import { authenticate,authorizeadmin } from "../middlewares/authmiddleware.js";
import checkId from "../middlewares/checkId.js";
import { addProduct,updateProduct,deleteProduct,fetchProducts,fetchProductById,fetchAllProducts,addProductReview,
fetchTopProducts,fetchNewProducts,filterProducts
} from "../controllers/productControllers.js";




router.
route('/')
.post(authenticate,authorizeadmin,formidable(),addProduct)
.get(fetchProducts)

router.
route('/fetchallproducts')
.get(fetchAllProducts);
router.get('/top',fetchTopProducts);
router.get('/new',fetchNewProducts);
router
.route('/:id')
   .put(authenticate,authorizeadmin,updateProduct)
   .delete(authenticate,authorizeadmin,deleteProduct)
   .get(fetchProductById)
   

router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.route('/filtered-products').post(filterProducts)



export default router;