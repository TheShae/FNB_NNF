module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    req.user = { merchantId: '11111111-1111-1111-1111-111111111111' };
  } else {
    req.user = { merchantId: '11111111-1111-1111-1111-111111111111' };
  }
  next();
};
