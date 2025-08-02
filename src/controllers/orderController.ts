import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Comment } from '../models/comment';
import { Vote } from '../models/vote';
import { errorHandler, logger } from '../utils';

export const addComment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id: startupId } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.create({ userId: req.user.id, startupId, content });
    res.status(201).json(comment);
  } catch (error) {
    logger.error('Error adding comment', error);
    errorHandler(res, error);
  }
};

export const listComments = async (req: Request, res: Response) => {
  try {
    const { id: startupId } = req.params;
    const comments = await Comment.findAll({ where: { startupId } });
    res.status(200).json(comments);
  } catch (error) {
    logger.error('Error fetching comments', error);
    errorHandler(res, error);
  }
};

export const voteStartup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id: startupId } = req.params;
  const { voteType } = req.body;
  try {
    const vote = await Vote.create({ userId: req.user.id, startupId, voteType });
    res.status(201).json(vote);
  } catch (error) {
    logger.error('Error voting on startup', error);
    errorHandler(res, error);
  }
};
