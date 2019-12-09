import _ from 'lodash';

const validatorResponder = (req, res, next) => {
  const { failure } = req;
  if (!_.isEmpty(failure)) {
    const { error, status } = failure;
    return res.status(status).json({
      message: error
    });
  } else {
    next();
  }
};

export default validatorResponder;