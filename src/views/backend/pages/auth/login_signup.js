import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import SignupForm from "../signupform/SignupForm";
import logo from "../../../../assets/images/login/logo.png";
import OtpInput from "react-otp-input";
import { FcPrevious } from "react-icons/fc";
// multi lang
import { useTranslation } from "react-i18next";
import LoginMob from "./Login_mb";
const Loginsignup = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // switch language
  const { t } = useTranslation();

  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  // get the page number
  const [page, setPage] = useState(0);
  const [subscriptionForm, setSubscriptionForm] = useState(false);
  const [otp, setOtp] = useState(false);
  let history = useHistory("");
  // cards
  const [activeCard, setActiveCard] = useState(true);
  const handleCardClick = (cardIndex) => {
    setActiveCard(cardIndex);
  };
  const [otpValue, setOtpValue] = useState("");
  // form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    subscriptionType: "",
    otp: "",
  });
  const handleOtpChange = (otp) => {
    setOtpValue(otp);
    setFormData({ ...formData, otp: otp }); // Update the formData object with the new OTP value
  };

  const handleSubmit = () => {
    console.log(formData);
  };
  return (
    <>
      <section className="sign-in-page">
        {width > 820 ? (
          <>
            <div className="signinlogo">
              <Col md="3" xs="12">
                <img src={logo} alt="Logo" style={{ width: "50%" }} />
              </Col>
            </div>
            <div className="maincontainer">
              {!subscriptionForm ? (
                <div
                  className={`login-signup-container ${
                    isSignUpActive ? "right-panel-active" : ""
                  }`}
                  id="container"
                >
                  <div className="login-signup-form-container sign-up-container">
                    <div className="login-signup-form">
                      <h3>Create Account</h3>
                      <h4>Personal Details</h4>

                      <input
                        type="text"
                        placeholder="Name"
                        value={formData.name} //setting the value of the form to the props value
                        onChange={
                          (e) =>
                            setFormData({ ...formData, name: e.target.value }) //setting the formData to the value input of the textfield
                        }
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email} //setting the value of the form to the props value
                        onChange={
                          (e) =>
                            setFormData({ ...formData, email: e.target.value }) //setting the formData to the value input of the textfield
                        }
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={formData.password} //setting the value of the form to the props value
                        onChange={
                          (e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            }) //setting the formData to the value input of the textfield
                        }
                      />
                      <button
                        className="button"
                        onClick={() => {
                          setPage(page + 1);
                          setSubscriptionForm(true);
                        }}
                      >
                        Next
                      </button>
                    </div>

                    {/* <form action="#" className="login-signup-form">
                    <h3>Create Account</h3>

                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="button">Sign Up</button>
                  </form> */}
                  </div>
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
                  </div>
                  <div className="overlay-container">
                    <div className="overlay">
                      <div className="overlay-panel overlay-left">
                        <h3>Welcome Back!</h3>
                        <p>
                          To keep connected with us please login with your
                          personal info
                        </p>
                        <button
                          className="ghost button"
                          id="signIn"
                          onClick={handleSignInClick}
                        >
                          Sign In
                        </button>
                      </div>
                      <div className="overlay-panel overlay-right">
                        <h3>Hello, Friend!</h3>
                        <p>
                          Enter your personal details and start journey with us
                        </p>
                        <button
                          className="ghost button"
                          id="signUp"
                          onClick={handleSignUpClick}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form2">
                  {!otp ? (
                    <div className="Subscription">
                      <div className="heading-icon">
                        <FcPrevious
                          className="prev-icon"
                          size={30}
                          onClick={() => {
                            setPage(page - 1);
                            setSubscriptionForm(false);
                          }}
                        />
                        <div className="heading">Choose Subscription Type</div>
                      </div>

                      <div className="subscriptionCards">
                        <div
                          className={`${
                            !activeCard ? "activeCard" : "inActiveCard"
                          }`}
                        >
                          <div className="subCard">
                            <div className="subCardBody">
                              <h4>Free</h4>
                              <div className="cardText">
                                <ul>
                                  <li>Limited Content</li>
                                  <li>Contains Ads</li>
                                  <li>Free of Cost</li>
                                </ul>
                              </div>
                            </div>
                            <div className="btn-price">
                              <div style={{ marginLeft: "1.5rem" }}>
                                <h6>0$ /Month</h6>
                                <span>upto 10 users</span>
                              </div>

                              <button
                                className={`subBtn ${
                                  !activeCard ? "subBtn-active" : ""
                                }`}
                                value="free"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFormData({
                                    ...formData,
                                    subscriptionType: e.target.value,
                                  });
                                  handleCardClick(false);
                                  setOtp(true);
                                }}
                              >
                                Go Free
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${
                            activeCard ? "activeCard" : "inActiveCard"
                          }`}
                        >
                          <div className="subCard">
                            <div className="subCardBody">
                              <h4>Premium</h4>
                              <div className="cardText">
                                <ul>
                                  <li>Unlimited Content</li>
                                  <li>Contains No Ads</li>
                                  <li>20$/Month</li>
                                </ul>
                              </div>
                            </div>
                            <div className="btn-price">
                              <div style={{ marginLeft: "1.5rem" }}>
                                <h6>20$ /Month</h6>
                                <span>Unlimited Access</span>
                              </div>

                              <button
                                className={`subBtn ${
                                  activeCard ? "subBtn-active" : ""
                                }`}
                                value="paid"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFormData({
                                    ...formData,
                                    subscriptionType: e.target.value,
                                  });
                                  handleCardClick(true);
                                  setOtp(true);
                                }}
                              >
                                Buy Premium
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="sub-btn">
                        <button
                          className="button"
                          onClick={() => {
                            setPage(page - 1);
                            setSubscriptionForm(false);
                          }}
                        >
                          Previous
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            setPage(page + 1);
                            setOtp(true);
                          }}
                        >
                          Next
                        </button>
                      </div> */}
                    </div>
                  ) : (
                    <div className="Subscription">
                      <div className="heading-icon">
                        <FcPrevious
                          className="prev-icon"
                          size={30}
                          onClick={() => {
                            setPage(page - 1);
                            setOtp(false);
                          }}
                        />
                        <div className="heading">
                          Please enter the One-Time Password to verify your
                          account
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
                              <input {...inputProps} />
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

                        <button className="button" onClick={handleSubmit}>
                          Validate
                        </button>

                        <div className="otp-body">
                          <h4>
                            <Link>Resend One Time Password</Link>
                          </h4>
                          <span style={{ marginBottom: "2rem" }}>
                            <Link
                              onClick={() => {
                                setSubscriptionForm(false);
                                setOtp(false);
                              }}
                            >
                              Entered a Wrong Email?
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>{" "}
          </>
        ) : (
          <div>
            <LoginMob />
          </div>
        )}
      </section>
    </>
  );
};

export default Loginsignup;
