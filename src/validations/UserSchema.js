const Joi = require('joi');

const UserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(30)
    .regex(/\w/)
    .regex(/\d/)
    .regex(/[^\w\d]/),
});

export default UserSchema;
