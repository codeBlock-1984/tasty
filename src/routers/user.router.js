import express from 'express';
import UserController from '../controllers/user.controller';
import dBHelper from '../helpers/db.helper';

const router = express.Router();
const { findRecord } = dBHelper;

router.post('/', UserController.create);
router.get('/:id', UserController.get);
router.get('/', UserController.getAll);
router.put('/:id', findRecord('User'), UserController.update, findRecord('User'));
router.delete('/:id', findRecord('User'), UserController.delete);

export default router;
