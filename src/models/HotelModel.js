import { Schema, model } from 'mongoose';
import { modelNames } from '../utils';

const HotelSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  photo: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const HotelModel = model(modelNames.hotel, HotelSchema);

export default HotelModel;
