/* Backup configuration */
export const BACKUP_CONFIG = {
  interval: '24h', // Backup frequency
  provider: 'AWS_S3', // Backup provider
  bucketName: 'enterprise-app-backups', // S3 bucket name
  region: 'us-east-1', // S3 region
  encryption: true, // Enable encryption for backups
  retentionPeriod: 30 // Days to retain backups
};