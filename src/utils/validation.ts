import Joi from 'joi';

export const validateUserRegistration = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

export const validateStartupSubmission = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    url: Joi.string().uri().required(),
    location: Joi.string().max(100).required(),
  });
  return schema.validate(data);
};
