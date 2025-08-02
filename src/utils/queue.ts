import { Queue } from 'bull';
import { logger } from './logger';

const jobQueue = new Queue('jobQueue');

export const addJobToQueue = async (jobName: string, data: any): Promise<void> => {
  try {
    await jobQueue.add(jobName, data);
    logger.info(`Job added to queue: ${jobName}`);
  } catch (error) {
    logger.error(`Failed to add job to queue: ${jobName}, Error: ${error}`);
  }
};

export const processQueue = (jobName: string, processor: Function): void => {
  try {
    jobQueue.process(jobName, async (job) => {
      await processor(job.data);
    });
    logger.info(`Queue processing started for: ${jobName}`);
  } catch (error) {
    logger.error(`Failed to process queue for: ${jobName}, Error: ${error}`);
  }
};