//عايز اعمل ميدل وير بيتاخد من ال token ويشوف هل

import { findById } from '../db/DBservices.js';
import { userModel } from '../db/models/user.model.js';
import { NotFoundException, NotValidTokenException } from '../utils/exceptions.js';
import jwt from 'jsonwebtoken';

export const auth = () => {
  return async (req, res, next) => {
    const token = req.headers.auth;
    if (!token) {
      return next(new NotValidTokenException());
    }
    const data = jwt.verify(token, process.env.ACCESS_TOKEN);
    const id = data._id;
    const user = await findById({ model: userModel, id });

    if (!user) {
        return next(new NotFoundException("user"))
    }   
    req.user = user;

    next();
  };
};
