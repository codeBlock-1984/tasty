import express from 'express';
import OrderController from '../controllers/order.controller';
import authorize from '../middleware/authorize';
import orderValidator from '../middleware/orderValidator';
import validatorResponder from '../middleware/validatorResponder';

const router = express.Router();

router.post('/', authorize(['CUSTOMER', 'SUPER', 'ADMIN']), orderValidator, validatorResponder, OrderController.create);

export default router;
