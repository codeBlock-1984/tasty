import express from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import productRouter from './product.router';
import orderRouter from './order.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);

export default router;
