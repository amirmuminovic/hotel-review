import { Schema, model } from 'mongoose';
import { userTypes, modelNames } from '../utils';

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    default: userTypes.regular,
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: modelNames.hotel,
  }],
  confirmationCode: {
    type: String,
  },
  confirmationCodeExpiration: {
    type: Date,
  },
  valid: {
    type: Boolean,
    default: false,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
});

const UserModel = model(modelNames.user, UserSchema);

export default UserModel;
