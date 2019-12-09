import authHelper from '../helpers/auth.helper';

const { verifyToken } = authHelper;

const authorize = (roles) => {
  return (req, res, next) => {
    const { token } = req.headers;
    let userDetails = {};
    
    if (!token) {
      return res.status(401).json({
        message: 'User not authenticated'
      });
    }

    try {
      userDetails = verifyToken(token);
    } catch (error) {
      return res.status(401).json({
        message: 'User not authenticated'
      });
    }

    const { role } = userDetails;
    const isAuthorized = roles.includes(role);

    if (!isAuthorized) {
      return res.status(403).json({
        message: 'User not authorized'
      });
    }

    req.user = userDetails;
    next();
  };
};

export default authorize;
