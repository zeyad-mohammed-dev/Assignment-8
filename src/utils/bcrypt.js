import { compareSync, hashSync } from 'bcryptjs';

export const hash = (text) => {
  return hashSync(text, Number(process.env.BCRYPT_SALT_ROUNDS));
};

export const compare = (text, hashedText) => {
  return compareSync(text, hashedText);
};
