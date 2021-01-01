const Joi = require('joi');

const SearchItemSchema = Joi.object({
  query: Joi.array().optional().items(Joi.object({
    type: Joi.string().valid('eq', 'in', 'gt', 'lt'),
    feature: Joi.string().valid('name', 'address', 'photo', 'description', 'lat', 'long', 'rating'),
    value: Joi.alternatives(
      Joi.number(),
      Joi.string(),
    ),
  })),
  sort: Joi.array().optional().items(Joi.object({
    type: Joi.string().valid('asc', 'desc'),
    feature: Joi.string().valid('name', 'address', 'photo', 'description', 'lat', 'long', 'rating'),
    priority: Joi.number().greater(-1),
  })),
  paging: Joi.object({
    page: Joi.number().greater(-1).integer(),
    pageSize: Joi.number().greater(-1).integer(),
  }).optional(),
});

export default SearchItemSchema;
