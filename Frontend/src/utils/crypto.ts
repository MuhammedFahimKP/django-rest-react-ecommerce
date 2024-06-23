import CryptoJS from "crypto-js";

export function encrypt(message: string) {
  const payload = message;
  var derived_key = CryptoJS.enc.Base64.parse(
    "Tt/YxrlwlygfcAx+vXK0ZLo/wVVRGm/Qmv2K5sARL1c="
  );
  var iv = CryptoJS.enc.Utf8.parse("1020304050607080");
  var test = CryptoJS.AES.encrypt(payload, derived_key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  }).toString();

  return test;
}

class Crypto {
  private key = CryptoJS.enc.Base64.parse(import.meta.env.VITE_CRYPTO_KEY);
  private iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_IV);

  encrypt(message: string): string {
    /**
     *
     * @param message string to encrypt
     * @returns encrypted string
     */

    const encrypted = CryptoJS.AES.encrypt(message, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
    }).toString();

    return encrypted;
  }

  decrypt(message: string): string {
    const decrypted = CryptoJS.AES.decrypt(message, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
    }).toString();

    return decrypted;
  }
}

const CryptoInstance = () => new Crypto();

export default CryptoInstance;
