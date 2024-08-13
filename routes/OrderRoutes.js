import express from "express";
const router=express.Router();
import { calculateTotalSalesByDate, countTotalOrders, createOrder, findOrderById, getAllOrders, getTotalSales, getUserOrders
,markOrderAsPaid,markOrderAsDelivered } from "../controllers/orderController.js";
import {authenticate,authorizeadmin} from "../middlewares/authmiddleware.js"

router.
route('/')
.post(authenticate,createOrder)
.get(authenticate,authorizeadmin,getAllOrders)


router.route('/myorders').get(authenticate,getUserOrders)
router.route('/total-orders').get(countTotalOrders)
router.route('/total-sales').get(getTotalSales)
router.route('/sales-bydate').get(calculateTotalSalesByDate)
router.route('/:id').get(authenticate,findOrderById)
router.route('/:id/pay').put(authenticate,markOrderAsPaid)
router.route('/:id/deliver').put(authenticate,authorizeadmin,markOrderAsDelivered)


export default router;