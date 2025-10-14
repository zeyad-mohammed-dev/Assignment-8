import { model, Schema } from 'mongoose';
import { compare, hash } from '../../utils/bcrypt.js';
import { decryption, encryption } from '../../utils/crypto.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniqe: true,
    },
    password: {
      type: String,
      required: true,
      set(value) {
        return hash(value);
      },
    },
    phone: {
      type: String,
      required: true,
      set(value) {
        return encryption(value);
      },
      get(value) {
        return decryption(value);
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
    methods: {
      checkPassword(text) {
        return compare(text, this.password);
      },
    },
  }
);

export const userModel = model('user', userSchema);
