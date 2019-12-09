import _ from 'lodash';
import { User, Product, Order } from '../db/models/index';

const dBHelper = {
  findRecord: (type, search = null) => {
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
      const { email } = req.body;
      const query = search ? { where: { email } } : { where: { id } };
      const result = await model.findOne(query);
      if (_.isEmpty(result)) {
        return res.status(404).json({
          message: `${ type } not found`
        });
      } else {
        req.found = result;
        return next();
      }
    };
  },
};

export default dBHelper;
