import { Order, User, OrderItem, Product } from '../db/models/index';
import helpers from '../helpers';

const {
  getResponseSuccess, getResponseFailure, getTrimmedObject,
  getPaginationData, getFormattedResult, getProductStatus
} = helpers;

class OrderController {
  static async create(req, res, next) {
    const { id } = req.user;
    const { order } = req.body;
    const userId = id;

    try {
      const orderResult = await Order.create({ userId });
      
      const { id } = orderResult;

      const promiseArray = order.map(orderObject => {
        const { item , quantity, currentProdStock, prodId } = orderObject;
        
        return OrderItem.create({ orderId: id, productId: item, quantity });
      });

      const promiseUpdateArray = order.map(orderObject => {
        const { currentProdStock, prodId } = orderObject;
        
        return Product.update({ stock: currentProdStock }, { where: { id: prodId } });
      });

      const promiseStatusArray = order.map(orderObject => {
        const { currentProdStock, prodId } = orderObject;
        const status = getProductStatus(currentProdStock);
        return Product.update({ stock: currentProdStock, status }, { where: { id: prodId } });
      });
      
      await Promise.all(promiseArray);
      await Promise.all(promiseUpdateArray);
      const result = await Order.findOne({
        where: { id },
        include: [
          { model: User, as: 'customer', attributes: { exclude: ['password'] } },
          { model: OrderItem, include: [{ model: Product }] },
        ]
      });

      req.success = getResponseSuccess(201, 'Order successfully created', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async update(req, res, next) {
    const { name, description, catId, image, price, stock } = req.body;
    const status = getOrderStatus(stock);
    const { id } = req.params;
    const newDetails = getTrimmedObject({ name, description, image, price, catId, stock, status });
    try {
      const result = await Order.update(newDetails, { where: { id } });
      req.success = getResponseSuccess(200, 'Order successfully updated', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Order.destroy({ where: { id } });
      req.success = getResponseSuccess(200, 'Order successfully deleted', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async get(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Order.findOne({ where: { id }, include: [{ model: Category, as: 'category' }] });
      req.success = getResponseSuccess(200, 'Order fetched successfully', [result]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }

  static async getAll(req, res, next) {
    const { page } = req.query;
    const paginationData = getPaginationData(page, false);
    try {
      const result = await Order.findAndCountAll({ ...paginationData, include: [{ model: Category, as: 'category' }] });
      const formattedResult = getFormattedResult(result, page);
      req.success = getResponseSuccess(200, 'Orders fetched successfully', [formattedResult]);
    } catch (error) {
      req.failure = getResponseFailure(error);
    }
    next();
  }
}

export default OrderController;
