import { findByEmail, findById, findOne } from '../db/DBservices.js';
import { noteModel } from '../db/models/note.model.js';
import { userModel } from '../db/models/user.model.js';
import { NotFoundException, NotValidEmailException } from './exceptions.js';

export const isExist = async (usedModel, usedFilter) => {
  const isExist = await findOne({ model: usedModel, filter: usedFilter });
  if (isExist) {
    throw new NotValidEmailException();
  }
};

export const isNoteExist = async (noteId) => {
  const note = await findById({ model: noteModel, id: noteId });
  if (!note) {
    throw new NotFoundException('note');
  }
  return note;
};

export const isUserExist_byId = async (userId) => {
  const user = await findById({ model: userModel, id : userId });
  if (!user) {
    throw new NotFoundException('user');
  } else {
    return user;
  }
};

export const isUserExist_byEmail = async (email) => {
  const user = await findByEmail(userModel, email);
  if (!user) {
    throw new NotFoundException('user');
  } else {
    return user;
  }
};
