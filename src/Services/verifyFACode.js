import axios from "axios";

function verifyFACode(obj) {
  return new Promise((resolve, reject) => {
    const url = "http://54.221.169.56:3004/api/user/verifyCode";

    axios
      .post(url, obj)
      .then(async (response) => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
}
export default verifyFACode;
