import * as Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  role: Joi.string().valid('user', 'admin').required(),
});

export const startupSchema = Joi.object({
  name: Joi.string().max(255).required(),
  url: Joi.string().uri().required(),
  location: Joi.string().max(255).required(),
  stage: Joi.string().valid('idea', 'prototype', 'launch', 'growth').required(),
  goals: Joi.string().max(1000),
  discount: Joi.string().optional(),
});