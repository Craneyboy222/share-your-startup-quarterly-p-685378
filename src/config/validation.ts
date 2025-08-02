import { body, param } from 'express-validator';

export const startupValidationRules = () => [
  body('name').isLength({ max: 100 }).withMessage('Startup name is too long.'),
  body('url').isURL().withMessage('Invalid URL format.'),
  body('location').notEmpty().withMessage('Location cannot be empty.'),
  body('stage').isIn(['idea', 'prototype', 'growth', 'established']).withMessage('Invalid startup stage.')
];

export const commentValidationRules = () => [
  body('content').isLength({ max: 500 }).withMessage('Comment is too long.')
];