import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';
export function encryptRSA(plainText: string) {
    const encrypt = new JSEncrypt({ default_key_size: '1024' });

    encrypt.setPublicKey(
        '-----BEGIN PUBLIC KEY-----' +
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfxux0cJb7awTICxQyJqhqw7ud' +
            'FJC8VRZINAB+WSElKTfK+ipvwenTHMJ9UO91NND4xOJuQLxzHOlobdzaPUXe+y89' +
            'E2Rob/Oak7IHsJ4++Mp+UgFlV8jRS0mKzS7EsGpYyF3MITB8Bujo5DSKz2IsUiPY' +
            'yJ2eQkIzGineMJ1u1wIDAQAB' +
            '-----END PUBLIC KEY-----',
    );

    const encrypted = encrypt.encrypt(plainText);

    return encrypted;
}

export function encryptLong(plainText: string) {
    const secretKey = 'aesEncryptionKey';

    const encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(plainText),
        CryptoJS.enc.Utf8.parse(secretKey),
        {
            mode: CryptoJS.mode.ECB,
        },
    );

    const encryptedData = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    return encodeURIComponent(encryptedData);
}

export function decryptLong(encryptedText: string) {
    const secretKey = 'aesEncryptionKey';

    const decrypted = CryptoJS.AES.decrypt(
        encryptedText,
        CryptoJS.enc.Utf8.parse(secretKey),
        {
            mode: CryptoJS.mode.ECB,
        },
    );

    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

    return decodeURIComponent(decryptedData);
}
