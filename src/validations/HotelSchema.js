const Joi = require('joi');

const HotelSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .trim(),
  address: Joi.string()
    .min(2)
    .max(30)
    .trim(),
  photo: Joi.string()
    .base64(),
  description: Joi.string()
    .max(200),
  lat: Joi.number()
    .min(-90)
    .max(90),
  long: Joi.number()
    .min(-180)
    .max(180),
  rating: Joi.number()
    .integer()
    .min(0)
    .max(5),
});

export default HotelSchema;
