import axios from "axios";

function sendEmailVerification(obj) {
  const url = "http://54.221.169.56:3004/api/user/sendMailCode";

  axios
    .post(url, obj)
    .then((response) => {
      localStorage.setItem("email verification token", response.data.token);
    })
    .catch((error) => {
      if (error.response.status === 400) {
        console.log("Bad Request Error: ", error.response.data);
      } else if (error.response.status === 403) {
        console.log("Forbidden Error: ", error.response.data);
      } else {
        console.log("Error: ", error);
      }
    });
}

export default sendEmailVerification;
