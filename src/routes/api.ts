import express from 'express';
import authRoutes from './auth';
import usersRoutes from './users';
import startupsRoutes from './startups';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/startups', startupsRoutes);

export default router;