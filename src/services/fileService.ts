import AWS from 'aws-sdk';
import { logger } from '../utils/logger';

const s3 = new AWS.S3();

export class FileService {
  static async uploadFile(file: any) {
    try {
      const params = {
        Bucket: 'your-bucket-name',
        Key: file.originalname,
        Body: file.buffer,
        ACL: 'public-read'
      };
      const data = await s3.upload(params).promise();
      logger.info('File uploaded successfully', data);
      return data.Location;
    } catch (error) {
      logger.error('Error uploading file', error);
      throw error;
    }
  }
}
