import axios from "axios";
import CryptoJS from "crypto-js";
import generateRandomIv from "./generateRandomIv";

import { Buffer } from "buffer";

const btoa = (text) => {
  return Buffer.from(text, "binary").toString("base64");
};

const atob = (base64) => {
  return Buffer.from(base64, "base64").toString("binary");
};

function confirmPassword(obj) {
  return new Promise((resolve, reject) => {
    let msg = JSON.stringify(obj);
    const i = generateRandomIv(16);
    const key = CryptoJS.enc.Utf8.parse("ED6C504C24FD3140D42E3BFE9F92E4A1");
    const iv = CryptoJS.enc.Utf8.parse(i);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(msg), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });
    var transitmessage = JSON.stringify({
      iv: btoa(i),
      value: encrypted.toString(),
    });
    transitmessage = btoa(transitmessage);
    let request = {
      data: transitmessage,
    };
    const url = "http://54.221.169.56:3004/api/user/login";

    axios
      .post(url, request)
      .then(async (response) => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
}
export default confirmPassword;
