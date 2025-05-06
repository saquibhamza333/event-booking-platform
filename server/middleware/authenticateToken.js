import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) return res.status(403).send('Access denied');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.userId = user.userId;
    next();
  });
};

export default authenticateToken;
