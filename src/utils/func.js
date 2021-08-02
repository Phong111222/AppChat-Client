import CryptoJS from 'crypto-js';
import { secret } from './constant';

export const EncryptMessage = (message, secretkey) => {
  return CryptoJS.AES.encrypt(message, secretkey).toString();
};

export const DecryptMessage = (message, secretkey) => {
  const bytes = CryptoJS.AES.decrypt(message, `${secretkey} ${secret}`);
  return bytes.toString(CryptoJS.enc.Utf8);
};
