import _ from 'lodash';
import { User, Product, Order } from '../db/models/index';

const dBHelper = {
  findRecord: (type) => {
    let model;
    switch (type) {
      case 'User':
        model = User;
        break;

      case 'Product':
        model = Product;
        break;
    
      case 'Order':
        model = Order;
        break;

      default:
        break;
    }

    return async (req, res, next) => {
      const { id } = req.params;
      const result = await model.findOne({ where: { id } });
      if (_.isEmpty(result)) {
        return res.status(404).json({
          message: `${ type } with id ${ id } not found`
        });
      } else {
        req.found = result;
        return next();
      }
    };
  },
};

export default dBHelper;
