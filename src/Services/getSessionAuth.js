import axios from "axios";
import atob from "atob";
import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("ED6C504C24FD3140D42E3BFE9F92E4A1");

async function AuthSession() {
  const token = localStorage.getItem("token");
  if (token) {
    const authUrl = `http://54.221.169.56:3004/api/user/auth/${token}`;
    try {
      const authResponse = await axios.get(authUrl);
      let res = atob(authResponse.data.data);
      let jsn = JSON.parse(res);
      const decrypted = CryptoJS.AES.decrypt(jsn.value, key, {
        mode: CryptoJS.mode.CBC,
        iv: CryptoJS.enc.Utf8.parse(atob(jsn.iv)),
      });
      const decrypt = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

      localStorage.setItem("session", JSON.stringify(decrypt));

      return true;
    } catch (authError) {
      console.error(authError);
      localStorage.removeItem("token");
      console.log("TOKEN INVALID");
      return false;
    }
  } else {
    return false;
  }
}

export default AuthSession;
