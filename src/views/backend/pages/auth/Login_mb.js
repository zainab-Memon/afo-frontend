import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const LoginMob = () => {
  let history = useHistory("");
  return (
    <div className="maincontainer">
      {/* <div className="mobForm">
        <div className="login-signup-form-container sign-in-container">
          <form action="#" className="login-signup-form">
            <h3>Sign in</h3>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Link to="/extra-pages/recover-pswd" className="f-link">
              Forgot your password?
            </Link>
            <button
              className="button"
              onClick={() => {
                history.push("/");
              }}
            >
              Sign In
            </button>
          </form>
        </div>{" "}
      </div> */}
    </div>
  );
};

export default LoginMob;
