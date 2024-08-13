import express from "express";
import { createdUser,loginUser,logoutUser,getAllUsers,getUserProfile,updateUserProfile,deleteUserById,getUserById,updateUserById } from "../controllers/userController.js";
import { authorizeadmin,authenticate } from "../middlewares/authmiddleware.js";
const router=express.Router()

router.route("/").post(createdUser).get(authenticate,authorizeadmin,getAllUsers);
router.post('/auth',loginUser);
router.post('/logout',logoutUser);
router.route('/profile').get(authenticate,getUserProfile).put(authenticate,updateUserProfile)
router.route('/:id').delete(authenticate,authorizeadmin,deleteUserById).get(authenticate,getUserById).put(authenticate,authorizeadmin,updateUserById);
export default router;