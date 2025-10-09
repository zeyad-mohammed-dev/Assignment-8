import { findOne } from '../db/DBservices.js';
import { NotValidEmailException } from './exceptions.js';

export const isExist = async (usedModel, usedFilter) => {
  const isExist = await findOne({ model: usedModel, filter: usedFilter });
  if (isExist) {
    throw new NotValidEmailException();
  }
};


