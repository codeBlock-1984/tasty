import express from 'express';
import AuthController from '../controllers/auth.controller';
import dBHelper from '../helpers/db.helper';

const router = express.Router();
const { findRecord } = dBHelper;

router.post('/register', AuthController.register);
router.post('/login', findRecord('User', 'email'), AuthController.login);

export default router;
