const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const manufacturerAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'manufacturer') {
      throw new UnauthenticatedError('Not authorized as manufacturer');
    }
    req.user = { userId: payload.userId, email: payload.email, role: payload.role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = manufacturerAuth;