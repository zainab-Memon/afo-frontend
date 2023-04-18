import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

// rtl
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { rtlModeAction, getRtlMode } from "../../../../store/mode/rtlmode";
// api
import sendEmailVerification from "../../../../Services/sendEmailVerification";
import verifyEmailCode from "../../../../Services/verifiyEmailCode";
import resetUserPass from "../../../../Services/resetUserPass";
import OtpInput from "react-otp-input";
// logo
import Logo from "../../../../assets/images/logo.png";
const mapStateToProps = (state) => {
  return {
    rtlMode: getRtlMode(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      rtlModeAction,
    },
    dispatch
  ),
});

const RecoverPswd = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  let history = useHistory();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const rtlMode = sessionStorage.getItem("rtl-mode");
    if (rtlMode === null) {
      props.rtlModeAction(props.rtlMode);
    } else {
      props.rtlModeAction(rtlMode);
    }
  });
  // send email verification for otp
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [otpForm, setOTPForm] = useState(false);
  const obj = {
    subject: "reset password",
    email: email,
  };

  // when user clicks on reset button send the email on emailverficiation api
  const isValidEmail = (email) => {
    // regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleEmailVerification = () => {
    if (!isValidEmail(email)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    sendEmailVerification(obj);

    setOTPForm(true);
  };
  // otp
  const [otpValue, setOtpValue] = useState("");
  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };
  // verify otp
  // when user enters the received code validate the code using email code and token from email verification API
  const verifyCode = {
    email: email,
    code: otpValue,
    token: localStorage.getItem("email verification token"),
  };

  //  used to show error on otp page
  const [wrongEmailCode, setWrongEmailCode] = useState(false);
  const [passwordResetPage, setPasswordResetPage] = useState(false);
  const handleEmailCodeVerification = () => {
    verifyEmailCode(verifyCode)
      .then((result) => {
        if (result) {
          // localStorage.removeItem("email verification token");
          setPasswordResetPage(true);
        } else {
          setWrongEmailCode(true);
          setTimeout(() => {
            setWrongEmailCode(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // new password
  const [password, setPassword] = useState("");
  const [weakPassword, setWeakPassword] = useState("");
  const passObj = {
    email: email,
    password: password,
    token: localStorage.getItem("email verification token"),
  };
  const resetPassword = () => {
    if (password.length > 5) {
      resetUserPass(passObj);
      history.push("/extra-pages/login");
      localStorage.removeItem("email verification token");
    } else {
      setWeakPassword(true);
      setTimeout(() => {
        setWeakPassword(false);
      }, 5000);
    }
  };
  return (
    <>
      <div className={`rtl-box ${show === true ? "show" : ""}`}>
        <button type="button" className="btn btn-light rtl-btn">
          <svg
            onClick={() => setShow(!show)}
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="rtl-panel">
          <ul className="modes">
            <li
              className="dir-btn"
              data-mode="rtl"
              data-active="false"
              onClick={() => {
                props.rtlModeAction("ltl");
              }}
              data-value="ltr"
            >
              <Link to="#">LTR</Link>
            </li>
            <li
              className="dir-btn"
              data-mode="rtl"
              data-active="true"
              onClick={() => {
                props.rtlModeAction("rtl");
              }}
              data-value="rtl"
            >
              <Link to="#">RTL</Link>
            </li>
          </ul>
        </div>
      </div>
      {width >= 800 ? (
        <section className="sign-in-page">
          <Container>
            <Row className="row justify-content-center align-items-center height-self-center">
              <Col lg="5" md="12" className="align-self-center">
                <div className="sign-user_card-reset-pass ">
                  {!otpForm ? (
                    <div className="sign-in-page-data">
                      <div className="sign-in-from w-100 m-auto">
                        <h3 className="mb-3 text-center">Reset Password</h3>
                        <p className="text-body">
                          Enter your email address and we'll send you an OTP to
                          reset your password
                        </p>
                        <Form className="mt-4">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control mb-0"
                              id="exampleInputEmail2"
                              placeholder="Enter email"
                              autoComplete="off"
                              required
                              name="email"
                              value={email || ""}
                              onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                            />
                          </div>
                          {showError && <p>Please Enter Valid Email Address</p>}
                          <div className="sign-info">
                            <Button
                              className="button"
                              onClick={handleEmailVerification}
                            >
                              Reset
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  ) : !passwordResetPage ? (
                    <div className="sign-in-page-data">
                      <div className="sign-in-from w-100 m-auto">
                        <h3 className="mb-3 text-center">Enter OTP</h3>
                        <div className="otp-parent-div">
                          {" "}
                          <p className="text-body text-center">
                            Please enter OTP sent on {email}
                          </p>
                          <OtpInput
                            value={otpValue}
                            onChange={handleOtpChange}
                            numInputs={6}
                            isInputNum
                            renderInput={(inputProps) => (
                              <input {...inputProps} />
                            )}
                            renderSeparator={<span>-</span>}
                            inputStyle={{
                              width: "3rem",
                              height: "3rem",
                              margin: "0 0.5rem",

                              borderRadius: 4,

                              outline: "none",
                              textAlign: "center",
                            }}
                          />
                          {wrongEmailCode && (
                            <p
                              className="text-center"
                              style={{ color: "red", marginTop: "1rem" }}
                            >
                              Entered wrong code, please enter the code sent on{" "}
                              {""}
                              {email}
                            </p>
                          )}
                        </div>

                        <Form className="mt-4">
                          <div className="sign-info">
                            <Button
                              className="button"
                              onClick={handleEmailCodeVerification}
                            >
                              Verify
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  ) : (
                    <div className="sign-in-page-data">
                      <div className="sign-in-from w-100 m-auto">
                        <h3 className="mb-3 text-center">Enter New Password</h3>
                        <p className="text-body">
                          Please enter new password for your account
                        </p>
                        <Form className="mt-4">
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control mb-0"
                              id="NewPassword"
                              placeholder="your new password"
                              autoComplete="off"
                              required
                              name="resetPassword"
                              value={password || ""}
                              onChange={(event) => {
                                setPassword(event.target.value);
                              }}
                            />
                            {weakPassword && (
                              <p
                                style={{
                                  color: "red",
                                  marginTop: "1rem",
                                  textAlign: "center",
                                }}
                              >
                                Password is too short, please enter strong
                                password
                              </p>
                            )}
                          </div>
                          <div className="sign-info">
                            <Button className="button" onClick={resetPassword}>
                              Reset Password
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <div className="sign-in-mob">
          <div className="maincontainer">
            <div className="mobForm">
              {!otpForm ? (
                <div className="signIn-Form">
                  <div className="logo">
                    <img src={Logo} alt="logo"></img>
                  </div>
                  <div className="signinForm">
                    <h3 style={{ textAlign: "center" }}>Resest Password</h3>
                    <div className="inputFields">
                      <div
                        className={`alert alert-danger ${
                          showError ? "" : "d-none"
                        }`}
                        role="alert"
                      >
                        Please Enter Valid Email Address
                      </div>

                      <label htmlFor="email">E-Mail</label>
                      <input
                        type="email"
                        placeholder="yourname@example.com"
                        required
                        name="email"
                        value={email || ""}
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                    </div>
                    <button
                      className="button"
                      onClick={handleEmailVerification}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : !passwordResetPage ? (
                <div className="signIn-Form">
                  <div className="logo">
                    <img src={Logo} alt="logo"></img>
                  </div>
                  <div className="signinForm">
                    <h3 style={{ textAlign: "center" }}>Enter OTP</h3>
                    <div className="otpbody">
                      <div className="otp-body">
                        <span
                          style={{
                            marginBottom: "2rem",
                            textAlign: "center",
                          }}
                        >
                          Please enter OTP sent on {email}
                        </span>
                        <OtpInput
                          value={otpValue}
                          onChange={handleOtpChange}
                          numInputs={6}
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
                            padding: 0,
                            borderRadius: 4,
                            background: "white",
                            outline: "none",
                            textAlign: "center",
                          }}
                        />
                      </div>
                      {wrongEmailCode && (
                        <p
                          className="text-center"
                          style={{ color: "red", marginTop: "1rem" }}
                        >
                          Entered wrong code, please enter the code sent on {""}
                          {email}
                        </p>
                      )}
                    </div>
                    <button
                      className="button"
                      onClick={handleEmailCodeVerification}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ) : (
                <div className="signIn-Form">
                  <div className="logo">
                    <img src={Logo} alt="logo"></img>
                  </div>
                  <div className="signinForm">
                    <h3 style={{ textAlign: "center" }}>Reset Password</h3>
                    <div className="inputFields">
                      <label htmlFor="email">New Password</label>
                      <input
                        type="password"
                        placeholder="Your New Password"
                        required
                        name="password"
                        value={password || ""}
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                      {weakPassword && (
                        <p
                          style={{
                            color: "red",
                            marginTop: "1rem",
                            textAlign: "center",
                          }}
                        >
                          Password is too short, please enter strong password
                        </p>
                      )}
                    </div>
                    <button className="button" onClick={resetPassword}>
                      Reset Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPswd);
