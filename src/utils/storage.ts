import AWS from 'aws-sdk';
import { logger } from './logger';

const s3 = new AWS.S3();

export const uploadFileToS3 = async (bucket: string, key: string, body: Buffer): Promise<void> => {
  try {
    await s3.upload({ Bucket: bucket, Key: key, Body: body }).promise();
    logger.info(`File uploaded to S3: ${key}`);
  } catch (error) {
    logger.error(`Failed to upload file to S3: ${key}, Error: ${error}`);
  }
};

export const downloadFileFromS3 = async (bucket: string, key: string): Promise<Buffer | null> => {
  try {
    const result = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    logger.info(`File downloaded from S3: ${key}`);
    return result.Body as Buffer;
  } catch (error) {
    logger.error(`Failed to download file from S3: ${key}, Error: ${error}`);
    return null;
  }
};