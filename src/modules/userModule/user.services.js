import jwt from 'jsonwebtoken';
import { create, findByIdAndDelete, findByIdAndUpdate, findOne } from '../../db/DBservices.js';
import { userModel } from '../../db/models/user.model.js';
import { NotValidCredentialsException } from '../../utils/exceptions.js';
import { successHandler } from '../../utils/successHandler.js';
import { isExist, isUserExist_byId } from '../../utils/helpers.js';

export const signup = async (req, res, next) => {
  const { name, email, password, phone, age } = req.body;
  await isExist(userModel, { email });
  const user = await create({ model: userModel, data: { name, email, password, phone, age } });
  return successHandler({ res, status: 201, data: user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findOne({ model: userModel, filter: { email } });
  if (!user || !user.checkPassword(password)) {
    return next(new NotValidCredentialsException());
  }

  const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '1Hr' });

  return successHandler({ res, status: 200, data: { accessToken } });
};

export const updateUser = async (req, res, next) => {
  const updateData = req.body;
  if (updateData.password) {
    return next(new Error('🔒 You Not Authorized to change password right now'));
  }

  if (updateData.email) {
    const email = updateData.email;
    await isExist(userModel, { email });
  }

  const id = req.user._id;
  const user = await isUserExist_byId(id);

  const updatedUser = await findByIdAndUpdate({
    model: userModel,
    id,
    data: {
      name: updateData.name || user.name,
      email: updateData.email || user.email,
      phone: updateData.phone || user.phone,
      age: updateData.age || user.age,
    },
  });

  return successHandler({ res, status: 200, data: updatedUser });
};

export const deleteUser = async (req, res, next) => {
  const id = req.user._id;
  await findByIdAndDelete({ model: userModel, id });
  return successHandler({ res });
};

export const getUser = async (req, res, next) => {
  const user = req.user;
  return successHandler({ res, data: user });
};
