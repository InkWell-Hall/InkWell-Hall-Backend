import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export const adminAuth = (req, res)=> {
  if (req.user.role !== 'admin')
    return res.status(401).json({message: 'you are not an admin'})
}