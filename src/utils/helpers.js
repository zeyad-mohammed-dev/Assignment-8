import { findByEmail, findById, findOne } from '../db/DBservices.js';
import { userModel } from '../db/models/user.model.js';
import { NotFoundException, NotValidEmailException } from './exceptions.js';

export const isExist = async (usedModel, usedFilter) => {
  const isExist = await findOne({ model: usedModel, filter: usedFilter });
  if (isExist) {
    throw new NotValidEmailException();
  }
};

export const isUserExist_byId = async (usedModel, id) => {
  const user = await findById({ model: usedModel, id });
  if (!user) {
    throw new NotFoundException('user');
  } else {
    return user;
  }
};

export const isUserExist_byEmail = async (model, email) => {
  const user = await findByEmail(model, email);
  if (!user) {
    throw new NotFoundException('user');
  } else {
    return user;
  }
};
