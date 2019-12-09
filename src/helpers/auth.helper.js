import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const salt = 10;
const secret = process.env.JWT_SECRET;

const AuthHelper = {
  hashPassword: (password) => {
      const hash = bcrypt.hashSync(password, salt);
      return hash;
  },

  verifyPassword: (password, hash) => {
      const isVerified = bcrypt.compareSync(password, hash);
      return isVerified;
  },

  getToken: (data) => {
      const token = jwt.sign(data, secret);
      return token;
  },

  verifyToken: (token) => {
      const data = jwt.verify(token, secret);
      return data;
  },
};

export default AuthHelper;
