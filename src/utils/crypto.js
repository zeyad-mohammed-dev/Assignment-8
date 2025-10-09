import CryptoJS from 'crypto-js';

export const encryption = (text) => {
  return CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET_KEY).toString();
};

export const decryption = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.CRYPTO_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
