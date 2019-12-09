import { Product, Category } from '../db/models/index';
import helpers from '../helpers';

const {
  getResponseSuccess, getResponseFailure, getTrimmedObject,
  getProductStatus, getPaginationData, getFormattedResult
} = helpers;

class ProductController {
  static async create(req, res, next) {
    const { name, description, image, catId, price, stock  } = req.body;
    const status = getProductStatus(stock);
    try {
      const result = await Product.create({ name, description, image, catId, price, stock, status });
      req.success = getResponseSuccess(201, 'Product successfully created', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async update(req, res, next) {
    const { name, description, catId, image, price, stock } = req.body;
    const status = getProductStatus(stock);
    const { id } = req.params;
    const newDetails = getTrimmedObject({ name, description, image, price, catId, stock, status });
    try {
      const result = await Product.update(newDetails, { where: { id } });
      req.success = getResponseSuccess(200, 'Product successfully updated', [result], true);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Product.destroy({ where: { id } });
      req.success = getResponseSuccess(200, 'Product successfully deleted', [result], true);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async get(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Product.findOne({ where: { id }, include: [{ model: Category, as: 'category' }] });
      req.success = getResponseSuccess(200, 'Product fetched successfully', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async getAll(req, res, next) {
    const { page } = req.query;
    const paginationData = getPaginationData(page, false);
    try {
      const result = await Product.findAndCountAll({ ...paginationData, include: [{ model: Category, as: 'category' }] });
      const formattedResult = getFormattedResult(result, page);
      req.success = getResponseSuccess(200, 'Products fetched successfully', [formattedResult]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }
}

export default ProductController;
