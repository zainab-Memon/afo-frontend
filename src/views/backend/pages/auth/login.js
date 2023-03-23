import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// rtl
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { rtlModeAction, getRtlMode } from "../../../../store/mode/rtlmode";
import logo from "../../../../assets/images/login/logo.png";

// multi lang
import { useTranslation } from "react-i18next";

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
            {" "}
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
                    <Form className="mt-4">
                      <Form.Group>
                        <Form.Control
                          type="email"
                          className="form-control mb-0"
                          id="exampleInputEmail1"
                          placeholder={t("enter email")}
                          autoComplete="off"
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="password"
                          className="form-control mb-0"
                          id="exampleInputPassword2"
                          placeholder={t("enter password")}
                          required
                        />
                      </Form.Group>
                      <div className="sign-info">
                        <Button
                          className="btn btn-hover btn-primary"
                          onClick={() => history.push("/")}
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
                    <Link to="/extra-pages/recover-pswd" className="f-link">
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
