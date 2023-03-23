import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
// rtl
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { rtlModeAction, getRtlMode } from "../../../../store/mode/rtlmode";
import logo from "../../../../assets/images/login/logo.png";
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
const SignUp = (props) => {
  const { t, i18n } = useTranslation();
  // switch language
  //Creating a method to change the language onChnage from select box
  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;

    i18n.changeLanguage(languageValue);
    // setting to local storage
    localStorage.setItem("lang", languageValue);
  };

  const [selectedOption, setSelectedOption] = useState("btn1");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
  };
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
            <Col lg="7" md="12" className="align-self-center">
              <div className="sign-user_card ">
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto">
                    <h3 className="mb-3 text-center">{t("sign up")}</h3>
                    <Form>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <Form.Label>{t("username")}</Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control mb-0"
                              id="exampleInputusername"
                              // placeholder={t("enter full name")}
                              placeholder="Enter Username"
                              autoComplete="off"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <Form.Label>{t("email")}</Form.Label>
                            <Form.Control
                              type="email"
                              className="mb-0"
                              id="exampleInputEmail3"
                              placeholder={t("enter email")}
                              autoComplete="off"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <Form.Label>{t("first name")}</Form.Label>
                            <Form.Control
                              type="text"
                              className="mb-0"
                              id="exampleInputfirstname"
                              placeholder={t("first name")}
                              autoComplete="off"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <Form.Label>{t("last name")}</Form.Label>
                            <Form.Control
                              type="email"
                              className="mb-0"
                              id="exampleInputlastname"
                              placeholder={t("last name")}
                              autoComplete="off"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                              type="date"
                              className="mb-0"
                              id="exampleInputdob"
                              autoComplete="off"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                              type="date"
                              className="mb-0"
                              id="exampleInputdob"
                              autoComplete="off"
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md="6">
                          <Form.Group>
                            <Form.Label>{t("password")}</Form.Label>
                            <Form.Control
                              type="password"
                              className="mb-0"
                              id="exampleInputPassword2"
                              placeholder={t("enter password")}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <Form.Label>{t("confirm password")}</Form.Label>
                            <Form.Control
                              type="password"
                              className="mb-0"
                              id="exampleInputPasswordconfirm"
                              placeholder={t("confirm password")}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <Form.Label>{t("phone number")}</Form.Label>
                            <Form.Control
                              type="tel"
                              className="mb-0"
                              id="exampleInputPhonenumber"
                              placeholder={t("enter phone number")}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md="6">
                          <Form.Group>
                            <Form.Label>{t("subscription type")}</Form.Label>
                            <ButtonGroup>
                              <Button
                                id="btn1"
                                variant={
                                  selectedOption === "btn1"
                                    ? "primary"
                                    : "outline-primary"
                                }
                                onClick={handleOptionChange}
                                style={{ width: "147px" }}
                              >
                                {t("paid")}
                              </Button>
                              <Button
                                id="btn2"
                                variant={
                                  selectedOption === "btn2"
                                    ? "primary"
                                    : "outline-primary"
                                }
                                onClick={handleOptionChange}
                                style={{ width: "147px" }}
                              >
                                {t("free")}
                              </Button>
                            </ButtonGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* <div className="custom-control custom-radio mt-2">
                        <input
                          type="radio"
                          id="customRadio1"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio1"
                        >
                          
                          Paid
                        </label>
                      </div>
                      
                      <div className="custom-control custom-radio mt-2">
                        <input
                          type="radio"
                          id="customRadio3"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio3"
                        >
                          Free
                        </label>
                      </div> */}
                      <Button
                        onClick={() => history.push("/")}
                        className="btn btn-hover btn-primary my-2"
                      >
                        {t("sign up")}
                      </Button>
                    </Form>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-center links">
                    {t("already have an account?")}
                    <Link to="/extra-pages/login" className="text-primary ml-2">
                      {t("sign in")}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
