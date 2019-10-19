import express from 'express';
import UserController from '../controllers/user.controller';
import dBHelper from '../helpers/db.helper';

const router = express.Router();
const { findRecord } = dBHelper;

router.post('/', UserController.create);
router.get('/:id', UserController.getUser);
router.get('/', UserController.getUsers);
router.put('/:id', findRecord('User'), UserController.update);
router.delete('/:id', findRecord('User'), UserController.delete);

export default router;
