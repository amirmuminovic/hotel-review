import { Schema, model } from 'mongoose';
import { modelNames } from '../utils';

const ReviewSchema = new Schema({
  author: {
    type: String,
    trim: true,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: modelNames.user,
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: modelNames.user,
  }],
  hotelID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const UserModel = model(modelNames.review, ReviewSchema);

export default UserModel;
