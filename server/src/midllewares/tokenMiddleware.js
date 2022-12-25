import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/responseHandler';
import userModel from '../models/userModel';

const tokenDecode = (req) => {
  try {
    const bearer = req.headers['authorization'];
    if (bearer) {
      const token = bearer.split(' ')[1];
      const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
      return decoded;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) {
    return responseHandler.unauthorizedResponse(res);
  }

  const user = await userModel.findById(tokenDecoded.data);

  if (!user) {
    return responseHandler.unauthorizedResponse(res);
  }

  req.user = user;

  next();
};

export default { auth, tokenDecode };
