const Joi = require('joi');

const ReviewSchema = Joi.object({
  author: Joi.string().max(30).trim(),
  rating: Joi.number(),
  description: Joi.string().max(500).trim(),
  likes: Joi.array().items(Joi.string()),
  dislikes: Joi.array().items(Joi.string()),
  hotelID: Joi.string(),
});

export default ReviewSchema;
