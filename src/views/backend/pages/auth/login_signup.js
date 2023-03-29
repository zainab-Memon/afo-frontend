import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignupForm from "../signupform/SignupForm";
import logo from "../../../../assets/images/login/logo.png";

// multi lang
import { useTranslation } from "react-i18next";

const Loginsignup = (props) => {
  // switch language
  const { t, i18n } = useTranslation();
  //Creating a method to change the language onChnage from select box
  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
    // setting to local storage
    localStorage.setItem("lang", languageValue);
  };
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  // get the page number
  const [page, setPage] = useState(0);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    console.log(page);
  };

  return (
    <>
      <section className="sign-in-page">
        <div className="signinlogo">
          <Col md="3" xs="12">
            <img src={logo} alt="Logo" />
          </Col>
          <Col md="3" xs="12">
            <Form>
              <select onChange={changeLanguageHandler} className="select-list">
                <option>Switch Language</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">Deutsch</option>
                <option value="pl">Polski</option>
                <option value="it">Italiano</option>
                <option value="es">Espanol</option>
              </select>
            </Form>
          </Col>
        </div>

        <Container>
          <Row>
            <div className="maincontainer">
              <div
                className={`login-signup-container ${
                  isSignUpActive ? "right-panel-active" : ""
                }`}
                id="container"
              >
                <div className="login-signup-form-container sign-up-container">
                  <div className="login-signup-form">
                    <SignupForm onPageChange={handlePageChange} />
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
                    <Link to="/extra-pages/login-signup" className="f-link">
                      Forgot your password?
                    </Link>
                    <button className="button">Sign In</button>
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
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Loginsignup;
