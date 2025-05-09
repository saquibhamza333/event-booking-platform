import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  console.log("Received token:", token);


  if (!token) return res.status(403).send('Access denied');

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send('Invalid token')}
    ;
    console.log(user);
    req.user = user;
    
    next();
  });
};

export default authenticateToken;
