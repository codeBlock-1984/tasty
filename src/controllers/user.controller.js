import { User } from '../db/models/index';
import helpers from '../helpers';

const { getResponseSuccess, getResponseFailure, getTrimmedObject } = helpers;

class UserController {
  static async create(req, res, next) {
    const { name, email, phone, password, role, address } = req.body;
    try {
      const result = await User.create({ name, email, phone, password, role, address });
      req.success = getResponseSuccess(201, 'User successfully created', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async update(req, res, next) {
    const { name, phone, role, address } = req.body;
    const { id } = req.params;
    const newDetails = getTrimmedObject({ name, phone, role, address });
    try {
      const result = await User.update(newDetails, { where: { id } });
      req.success = getResponseSuccess(200, 'User successfully updated', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.destroy({ where: { id } });
      req.success = getResponseSuccess(200, 'User successfully deleted', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async getUser(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.findOne({ where: { id }, raw: true });
      req.success = getResponseSuccess(200, 'User fetched successfully', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async getUsers(req, res, next) {
    try {
      const result = await User.findAll({ raw: true });
      req.success = getResponseSuccess(200, 'Users fetched successfully', result);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }
}

export default UserController;
