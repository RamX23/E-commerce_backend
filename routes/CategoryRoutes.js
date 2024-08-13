import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategory,
  readCategory
} from "../controllers/categoryController.js";

import { authenticate,authorizeadmin } from "../middlewares/authmiddleware.js";

router.route("/").post(authenticate,authorizeadmin,createCategory);
router.route("/:categoryId").put(authenticate,authorizeadmin,updateCategory)
router.route("/:categoryId").delete(authenticate,authorizeadmin,deleteCategory)
router.route("/categories").get(listCategory)
router.route("/:id").get(readCategory)

export default router; 