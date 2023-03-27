import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthSession from "../../../../getSessionAuth";

// rtl
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { rtlModeAction, getRtlMode } from "../../../../store/mode/rtlmode";
import logo from "../../../../assets/images/login/logo.png";

// multi lang
import { useTranslation } from "react-i18next";

import CryptoJS from "crypto-js";
import { Buffer } from "buffer";
import axios from "axios";
// iv generator
function generateRandomIv(length) {
  let pool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  pool = pool.repeat(5);
  pool = shuffle(pool);
  pool = pool.substring(0, length);
  return pool.toString();
}
// shuffle
function shuffle(str) {
  if (arguments.length === 0) {
    throw new Error("Wrong parameter count for str_shuffle()");
  }
  if (str === null) {
    return "";
  }
  str += "";
  let newStr = "";
  let rand;
  let i = str.length;
  while (i) {
    rand = Math.floor(Math.random() * i);
    newStr += str.charAt(rand);
    str = str.substring(0, rand) + str.substr(rand + 1);
    i--;
  }
  return newStr;
}
// btoa and atob

const btoa = (text) => {
  return Buffer.from(text, "binary").toString("base64");
};

const atob = (base64) => {
  return Buffer.from(base64, "base64").toString("binary");
};

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

const Login = (props) => {
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [emptyObj, setEmptyObj] = useState(false);
  function login(obj) {
    if (Object.keys(obj).length === 0) {
      setEmptyObj(true);
      setTimeout(() => {
        setEmptyObj(false);
      }, 3000);
      return;
    }
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
        // session request
        const result = await AuthSession(history);
        if (result) {
          history.push("/");
        } else {
          history.push("/extra-pages/login");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Invalid Email or password");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      });
  }
  const { t, i18n } = useTranslation();

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

  // switch language
  //Creating a method to change the language onChnage from select box
  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
    // setting to local storage
    localStorage.setItem("lang", languageValue);
  };

  // input values
  const [loginInput, setLoginInput] = useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginInput({ ...loginInput, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    login(loginInput);
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
          <Row className="justify-content-center align-items-center height-self-center">
            <Col lg="5" md="12" className="align-self-center">
              <div className="sign-user_card ">
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto">
                    <h3 className="mb-3 text-center">{t("sign in")}</h3>
                    {/* {error && (
                      <p
                        style={{
                          backgroundColor: "red",
                          padding: "4px",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {error}
                      </p>
                    )} */}
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
                    <Form className="mt-4">
                      <Form.Group>
                        <Form.Control
                          type="email"
                          className="form-control mb-0"
                          id="exampleInputEmail1"
                          placeholder={t("enter email")}
                          autoComplete="off"
                          required
                          name="email"
                          value={loginInput.email || ""}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="password"
                          className="form-control mb-0"
                          id="exampleInputPassword2"
                          placeholder={t("enter password")}
                          required
                          name="password"
                          value={loginInput.password || ""}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <div className="sign-info">
                        <Button
                          className="btn btn-hover btn-primary"
                          // onClick={() => history.push("/")}
                          onClick={handleSubmit}
                        >
                          {t("sign in")}
                        </Button>
                        <div className="custom-control custom-checkbox d-inline-block">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            {t("remember me")}
                          </label>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-center links">
                    {t("don't have an account")}
                    <Link
                      to="/extra-pages/sign-up"
                      className="text-primary ml-2"
                    >
                      {t("sign up")}
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center links">
                    {/* <Link to="/extra-pages/recover-pswd" className="f-link"> */}
                    <Link to="/extra-pages/login" className="f-link">
                      {t("forgot your password")}
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
