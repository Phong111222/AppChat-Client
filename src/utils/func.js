import CryptoJS from 'crypto-js';

export const EncryptMessage = (message, secretkey) => {
  return CryptoJS.AES.encrypt(message, secretkey).toString();
};

export const DecryptMessage = (message, secretkey) => {
  const bytes = CryptoJS.AES.decrypt(message, secretkey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
