import { Schema, model } from 'mongoose';
import { modelNames } from '../utils';

const ErrorSchema = new Schema({
  endpoint: String,
  message: String,
  name: String,
  stackTrace: String,
});

const ErrorModel = model(modelNames.error, ErrorSchema);

export default ErrorModel;
