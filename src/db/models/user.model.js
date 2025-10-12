import { model, Schema, set } from 'mongoose';
import { hash } from '../../utils/bcrypt.js';

const userSchema = new Schema({
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
    set:function(value){
      return hash(value)
    }
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 60,
  },
});

export const userModel = model('user', userSchema);
