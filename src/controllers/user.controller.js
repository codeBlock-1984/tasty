import { User } from '../db/models/index';
import helpers from '../helpers';

const {
  getResponseSuccess, getResponseFailure, getTrimmedObject,
  getPaginationData, getFormattedResult
} = helpers;

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
      req.success = getResponseSuccess(200, 'User successfully updated', [result], true);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.destroy({ where: { id } });
      req.success = getResponseSuccess(200, 'User successfully deleted', [result], true);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async get(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.findOne({ where: { id }, raw: true });
      req.success = getResponseSuccess(200, 'User fetched successfully', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async getAll(req, res, next) {
    const { page } = req.query;
    const paginationData = getPaginationData(page);
    try {
      const result = await User.findAndCountAll(paginationData);
      const formattedResult = getFormattedResult(result, page);
      req.success = getResponseSuccess(200, 'Users fetched successfully', [formattedResult]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }
}

export default UserController;
