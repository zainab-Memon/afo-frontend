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
function postSignUpData(obj, history, setuserExistError, setShowError) {
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
  // console.log(request);
  // // decryption of my input
  // let res = atob(request.data);
  // let jsn = JSON.parse(res);
  // const decrypted = CryptoJS.AES.decrypt(jsn.value, key, {
  //   mode: CryptoJS.mode.CBC,
  //   iv: CryptoJS.enc.Utf8.parse(atob(jsn.iv)),
  // });
  // const decrypt = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  // console.log(decrypt);
  // //
  const url = "http://54.221.169.56:3004/api/user";

  axios
    .post(url, request)
    .then((response) => {
      console.log(response);
      let res = atob(response.data.data);
      let jsn = JSON.parse(res);
      const decrypted = CryptoJS.AES.decrypt(jsn.value, key, {
        mode: CryptoJS.mode.CBC,
        iv: CryptoJS.enc.Utf8.parse(atob(jsn.iv)),
      });
      const decrypt = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      console.log(decrypt);
      history.push("/");
    })
    .catch((error) => {
      console.error(error);
      setuserExistError("User Already Exists");
      // setShowError(true);
      setTimeout(() => {
        setuserExistError(false);
      }, 3000);
    });
}
export default postSignUpData;
