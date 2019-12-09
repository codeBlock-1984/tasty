import _ from 'lodash';
import { Product } from '../db/models/index';
import helpers from '../helpers';

const { getResponseFailure } = helpers;

const orderValidator = async (req, res, next) => {
  const { order } = req.body;

  try {
    for await (const object of order) {
      const { item, quantity } = object;
      const result = await Product.findOne({ where: { id: item }, raw: true });
     
      if (_.isEmpty(result)) {
        req.failure = getResponseFailure(`Product with id ${item} not found`, 404);
        return next();
      }
      const { id, stock, name } = result;
      if (quantity > stock) {
        req.failure = getResponseFailure(`Quantity for ${name} is more than current stock of ${stock}`, 400);
        return next();
      }

      const currentStock = stock - quantity;
      object.currentProdStock = currentStock;
      object.prodId = id;
    }
    return next();
  } catch (error) {
    req.failure = getResponseFailure(error);
    return next();
  }
};

export default orderValidator;
