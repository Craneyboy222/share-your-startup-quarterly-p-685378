import crypto from 'crypto';

export const encryptData = (data: string, key: string): string => {
    const cipher = crypto.createCipher('aes-256-cbc', Buffer.from(key));
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
};

export const decryptData = (data: string, key: string): string => {
    const encryptedText = Buffer.from(data, 'hex');
    const decipher = crypto.createDecipher('aes-256-cbc', Buffer.from(key));
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};