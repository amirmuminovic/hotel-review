const Joi = require('joi');

const UserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email(),
  password: Joi.string().min(7).max(30),
});

export default UserSchema;
