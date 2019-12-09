import { User } from '../db/models/index';
import helpers from '../helpers';
import authHelper from '../helpers/auth.helper';

const {
  getResponseSuccess, getResponseFailure, getTrimmedObject,
  getPaginationData, getFormattedResult
} = helpers;

const { hashPassword, verifyPassword, getToken, verifyToken } = authHelper;

class AuthController {
  static async register(req, res, next) {
    const { email: emailInput, password: passwordInput } = req.body;
    const hash = hashPassword(passwordInput);
    try {
      const queryResult = await User.create({ email: emailInput, password: hash });
      const { password, ...values } = queryResult.dataValues;
      const { role, email, id, isVerified } = values;
      const token = getToken({ role, email, isVerified, id });
      const result = { ...values, token };
      req.success = getResponseSuccess(201, 'User successfully created', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async login(req, res, next) {
    const { email: emailInput, password: passwordInput } = req.body;

    try {
      const user = await User.findOne({ where: { email: emailInput }, raw: true });
      const { password, ...values } = user;
      const { role, email, id, isVerified } = values;
      const isVerifiedUser = verifyPassword(passwordInput, password);

      if (isVerifiedUser) {
        const token  = getToken({ role, email, id, isVerified });
        const result = { ...values, token };
        req.success = getResponseSuccess(200, 'User login successful', [result]);
      } else {
        req.success = getResponseSuccess(401, 'Invalid login details', []);
      }
    } catch (error) {
      req.failure = getResponseFailure(error);
    }

    next();
  }
}

export default AuthController;
