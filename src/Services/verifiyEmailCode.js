import axios from "axios";

function verifyEmailCode(obj) {
  const url = "http://54.221.169.56:3004/api/user/verifyMailCode";

  return axios
    .post(url, obj)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export default verifyEmailCode;
