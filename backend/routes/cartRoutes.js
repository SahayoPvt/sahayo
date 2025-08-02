import express from 'express';
import { clearCart, createCart, decrementCartItem, getCart, getCartByUser, incrementCartItem, removeFromCart } from '../controllers/cartController.js';
import { verifyUserAuth } from '../middleware/userAuth.js';

const router=express.Router();

router.route('/cart').post(verifyUserAuth,createCart)
router.route('/cartbyuser').get(verifyUserAuth,getCartByUser)
router.route('/all').get(getCart)

router.route('/cart/increment').put(verifyUserAuth, incrementCartItem);
router.route('/cart/decrement').put(verifyUserAuth, decrementCartItem);
router.route('/cart/remove').delete(verifyUserAuth, removeFromCart);
router.route('/cart/clear').delete(verifyUserAuth, clearCart);





export default router;

