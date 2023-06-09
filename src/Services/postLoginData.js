import axios from "axios";
import CryptoJS from "crypto-js";
import generateRandomIv from "./generateRandomIv";
import AuthSession from "./getSessionAuth";
import { Buffer } from "buffer";

const btoa = (text) => {
  return Buffer.from(text, "binary").toString("base64");
};

const atob = (base64) => {
  return Buffer.from(base64, "base64").toString("binary");
};

function postLoginData(obj, setShowLoginError, history, setLoginError) {
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
  const url = "http://54.221.169.56:3004/api/user/login";

  axios
    .post(url, request)
    .then(async (response) => {
      let res = atob(response.data.data);
      let jsn = JSON.parse(res);
      const decrypted = CryptoJS.AES.decrypt(jsn.value, key, {
        mode: CryptoJS.mode.CBC,
        iv: CryptoJS.enc.Utf8.parse(atob(jsn.iv)),
      });
      const decrypt = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      const Authtoken = decrypt.token;
      localStorage.setItem("token", Authtoken);
      // history.push("/");
      // session request
      const result = await AuthSession();
      if (result) {
        history.push("/");
      } else {
        history.push("/extra-pages/login");
      }
    })
    .catch((error) => {
      console.error(error);
      setLoginError("Invalid Email Address or Password");
      setShowLoginError(true);
      setTimeout(() => {
        setShowLoginError(false);
      }, 3000);
    });
}

export default postLoginData;
