import { Buffer } from "buffer";
import axios from "axios";
import generateRandomIv from "./generateRandomIv";
import CryptoJS from "crypto-js";

const btoa = (text) => {
  return Buffer.from(text, "binary").toString("base64");
};

const atob = (base64) => {
  return Buffer.from(base64, "base64").toString("binary");
};
async function updateUserDetails(obj) {
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
  console.log(request);

  const url = "http://54.221.169.56:3004/api/user";

  try {
    const response = await axios.put(url, request);

    let res = atob(response.data.data);
    let jsn = JSON.parse(res);
    const decrypted = CryptoJS.AES.decrypt(jsn.value, key, {
      mode: CryptoJS.mode.CBC,
      iv: CryptoJS.enc.Utf8.parse(atob(jsn.iv)),
    });
    const decrypt = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    console.log(decrypt);
  } catch (error) {
    console.error(error);
  }
}
export default updateUserDetails;
