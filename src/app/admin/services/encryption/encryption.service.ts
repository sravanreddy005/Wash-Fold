import { Injectable } from '@angular/core';
import * as cryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
var secretKey = environment.ENCRPTION_KEY;

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encryptData(data?: string) {
    try {
      let encrypted = cryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
      return encrypted;
    } catch (e) {
      return false;
    }
  }

  decryptData(data: string) {
    try {
      const bytes = cryptoJS.AES.decrypt(data,secretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return false;
    }
  }

}
