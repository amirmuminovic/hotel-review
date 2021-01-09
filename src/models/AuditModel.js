import { Schema, model } from 'mongoose';
import { modelNames } from '../utils';

const AuditSchema = new Schema({
  user: {
    type: String,
    trim: true,
  },
  timestamp: Date,
  remoteAddress: {
    type: String,
    trim: true,
  },
  jwt: {
    type: String,
    trim: true,
  },
  route: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
  },
});

const AuditModel = model(modelNames.audit, AuditSchema);

export default AuditModel;
