import Queue from 'bull';
import { logger } from '../utils/logger';

const jobQueue = new Queue('jobs', 'redis://127.0.0.1:6379');

export class QueueService {
  static async addJob(data: any) {
    try {
      await jobQueue.add(data);
      logger.info('Job added to queue');
    } catch (error) {
      logger.error('Error adding job to queue', error);
    }
  }

  static async processJobs() {
    jobQueue.process(async (job) => {
      try {
        // Process the job
        logger.info('Processing job', job.data);
      } catch (error) {
        logger.error('Error processing job', error);
      }
    });
  }
}
