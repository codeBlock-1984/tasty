import express from 'express';
import ProductController from '../controllers/product.controller';
import dBHelper from '../helpers/db.helper';

const router = express.Router();
const { findRecord } = dBHelper;

router.post('/', ProductController.create);
router.get('/:id', ProductController.get);
router.get('/', ProductController.getAll);
router.put('/:id', findRecord('Product'), ProductController.update, findRecord('Product'));
router.delete('/:id', findRecord('Product'), ProductController.delete);

export default router;
