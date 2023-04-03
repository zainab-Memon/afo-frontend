import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Logo from "../../../../assets/images/logo.png";
import { FcPrevious } from "react-icons/fc";
import OtpInput from "react-otp-input";
import postLoginData from "../../../../Services/postLoginData";
import postSignUpData from "../../../../Services/postSignUpData";
const LoginMob = () => {
  let history = useHistory("");
  const [signIn, setSignIn] = useState(true);
  const [subType, setSubType] = useState(false);
  const [selectedOption, setSelectedOption] = useState("paid");

  // login form data
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [emptyObj, setEmptyObj] = useState(false);
  const [loginInput, setLoginInput] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginInput({ ...loginInput, [name]: value });
  };
  const loginSubmit = async (event) => {
    event.preventDefault();
    if (!loginInput.email || !loginInput.password) {
      setEmptyObj(true);
      setTimeout(() => {
        setEmptyObj(false);
      }, 3000);
      return;
    }

    const isValidEmail = (email) => {
      // regular expression to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!isValidEmail(loginInput.email)) {
      setError("Invalid email address");
      setShowError(true);
      return;
    }
    // if (Object.keys(loginInput).length === 0) {
    //   setEmptyObj(true);
    //   setTimeout(() => {
    //     setEmptyObj(false);
    //   }, 3000);
    //   return;
    // }
    postLoginData(loginInput, setError, setShowError, history);
  };

  // signup form data
  const [otpForm, setOtpForm] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    //  subscriptionType: "",
    //  otp: "",
  });
  //  const handleOtpChange = (otp) => {
  //    setOtpValue(otp);
  //    setFormData({ ...formData, otp: otp }); // Update the formData object with the new OTP value
  //  };

  const [userExistError, setuserExistError] = useState("");
  // const [showError, setShowError] = useState(false);
  const handleSignUp = async (event) => {
    event.preventDefault();
    postSignUpData(formData, history, setuserExistError, setShowError);
  };
  return (
    <div className="sign-in-mob">
      <div className="maincontainer">
        <div className="mobForm">
          {signIn ? (
            <>
              <div className="signIn-Form">
                <div className="logo">
                  <img src={Logo} alt="logo"></img>
                </div>
                <div className="signinForm">
                  <h3>Sign in</h3>
                  <div className="inputFields">
                    <div
                      className={`alert alert-danger ${
                        showError ? "" : "d-none"
                      }`}
                      role="alert"
                    >
                      {error}
                    </div>
                    <div
                      className={`alert alert-danger ${
                        emptyObj ? "" : "d-none"
                      }`}
                      role="alert"
                    >
                      Enter email and password
                    </div>
                    <label htmlFor="email">E-Mail</label>
                    <input
                      type="email"
                      placeholder="yourname@example.com"
                      required
                      name="email"
                      value={loginInput.email || ""}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      placeholder="Your Password"
                      required
                      name="password"
                      value={loginInput.password || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button className="button" onClick={loginSubmit}>
                    Sign In
                  </button>
                </div>
              </div>
              <div className="no-account">
                <span>Dont' have an account yet?</span>
                <h6 onClick={() => setSignIn(false)}>Signup &#8594;</h6>
              </div>
            </>
          ) : (
            <>
              {!subType ? (
                <>
                  <div className="signIn-Form">
                    <div className="logo">
                      <img src={Logo} alt="logo"></img>
                    </div>
                    <div className="signinForm">
                      <h3>Sign Up</h3>

                      <div className="inputFields">
                        <div
                          className={`alert alert-danger ${
                            showError ? "" : "d-none"
                          }`}
                          role="alert"
                        >
                          {userExistError}
                        </div>
                        <label htmlFor="text">Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={formData.name} //setting the value of the form to the props value
                          onChange={
                            (e) =>
                              setFormData({ ...formData, name: e.target.value }) //setting the formData to the value input of the textfield
                          }
                        />
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          placeholder="yourname@example.com"
                          value={formData.email} //setting the value of the form to the props value
                          onChange={
                            (e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              }) //setting the formData to the value input of the textfield
                          }
                        />
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="Your Password"
                          value={formData.password} //setting the value of the form to the props value
                          onChange={
                            (e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              }) //setting the formData to the value input of the textfield
                          }
                        />
                      </div>
                      <button
                        className="button"
                        onClick={() => {
                          setSubType(true);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="no-account" style={{ marginTop: "2rem" }}>
                    <span>Already have an account?</span>
                    <h6 onClick={() => setSignIn(true)}>Sign In &#8594;</h6>
                  </div>
                </>
              ) : (
                <div className="signIn-Form">
                  <div className="signinForm">
                    {!otpForm ? (
                      <>
                        {" "}
                        <div className="heading-icon">
                          <FcPrevious
                            className="prev-icon"
                            size={30}
                            onClick={() => {
                              setSubType(false);
                            }}
                          />
                          <div className="heading">
                            Choose Subscription Type
                          </div>
                        </div>
                        <div className="sub-Card">
                          <div className="wrapper">
                            <input
                              type="radio"
                              name="slider"
                              id="tab-1"
                              value="free"
                              checked={selectedOption === "free"}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                            />
                            <input
                              type="radio"
                              name="slider"
                              id="tab-2"
                              value="paid"
                              checked={selectedOption === "paid"}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                            />
                            <header>
                              <label htmlFor="tab-1" className="tab-1">
                                Free
                              </label>
                              <label htmlFor="tab-2" className="tab-2">
                                Paid
                              </label>

                              <div className="slider"></div>
                            </header>
                            <div className="card-area">
                              <div className="cards">
                                <div className="myrow myrow-1">
                                  <div className="price-details">
                                    <span className="price">0</span>
                                    <p>For Limited use</p>
                                  </div>
                                  <ul className="features">
                                    <ul>
                                      <li>Limited Content</li>
                                      <li>Contains Ads</li>
                                      <li>Free of Cost</li>
                                    </ul>
                                  </ul>
                                </div>
                                <div className="myrow">
                                  <div className="price-details">
                                    <span className="price">99</span>
                                    <p>For Unlimited use</p>
                                  </div>
                                  <ul className="features">
                                    <ul>
                                      <li>Limited Content</li>
                                      <li>Contains Ads</li>
                                      <li>Free of Cost</li>
                                    </ul>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <button onClick={() => setOtpForm(true)}>
                              Choose plan
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="heading-icon">
                          <FcPrevious
                            className="prev-icon"
                            size={30}
                            onClick={() => {
                              setOtpForm(false);
                            }}
                          />
                          <div className="heading">
                            Please enter OTP to verify your account
                          </div>
                        </div>
                        <div className="otpbody">
                          <div className="otp-body">
                            <span style={{ marginBottom: "2rem" }}>
                              A one-Time Password has been sent to{" "}
                              {formData.email}
                            </span>
                            <OtpInput
                              value={otpValue}
                              onChange={handleOtpChange}
                              numInputs={4}
                              isInputNum
                              renderInput={(inputProps) => (
                                <input
                                  {...inputProps}
                                  style={{ margin: "0rem 0.4rem" }}
                                />
                              )}
                              renderSeparator={<span>-</span>}
                              inputStyle={{
                                width: "4rem",
                                height: "3rem",
                                margin: "0 1rem",

                                borderRadius: 4,

                                outline: "none",
                                textAlign: "center",
                              }}
                            />
                          </div>

                          <button
                            className="button"
                            onClick={handleSignUp}
                            style={{ marginTop: "2rem" }}
                          >
                            Validate
                          </button>

                          <div
                            className="otp-body"
                            style={{ marginTop: "3rem" }}
                          >
                            <h4>
                              <Link to="">Resend One Time Password</Link>
                            </h4>
                            <span style={{ marginBottom: "2rem" }}>
                              <Link
                                onClick={() => {
                                  setSubType(false);
                                  setOtpForm(false);
                                }}
                              >
                                Entered a Wrong Email?
                              </Link>
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
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
    </div>
  );
};

export default LoginMob;
