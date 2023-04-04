import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { MdError } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import confirmPassword from "../../../../../Services/confirmPass";
// import PhoneInput from "react-phone-number-input";
import { PhoneInput } from "react-contact-number-input";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
const Disable2FA = ({ show, setShow, setSwitchState }) => {
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);

  // phone number
  const [value, setValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNum = (newValue) => {
    setValue(newValue);
    if (newValue && newValue.countryCode && newValue.phoneNumber) {
      setPhoneNumber(newValue.countryCode.concat(newValue.phoneNumber));
    } else {
      setPhoneNumber("");
    }
  };
  // console.log(value);
  // console.log(phoneNumber);
  // verfification code
  const [verificationCode, setVerificationCode] = useState("");
  const [wrongCode, setWrongCode] = useState(false);
  const handleClose = () => {
    setShow(false);
    setForm2(false);
    setForm3(false);
    setSwitchState(true);
    setConfirmPass("");
    setWrongPass(false);
  };
  const handleDone = () => {
    setShow(false);
    setForm2(false);
    setForm3(false);
    setSwitchState(false);
  };
  // email
  const [email, setEmail] = useState(
    localStorage.getItem("session")
      ? JSON.parse(localStorage.getItem("session")).email
      : "name@example.com"
  );
  // password verification==========================
  // confirm password
  const [confirmPass, setConfirmPass] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  // verify password using login api
  const session = JSON.parse(localStorage.getItem("session") ?? "{}");
  const dataObj = {
    email: session.email,
    password: confirmPass,
  };
  const verifyPass = async () => {
    try {
      const result = await confirmPassword(dataObj);
      if (result) {
        setForm2(true);
        setWrongPass(false);
        setConfirmPass(""); // Clear the password field
      }
    } catch (error) {
      setWrongPass(true);
      setTimeout(() => {
        setWrongPass(false);
      }, 3000);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} className="enable-modal">
      <Modal.Header>
        <Modal.Title style={{ color: "black" }}>
          Disable Two-Step Authentication
        </Modal.Title>
      </Modal.Header>
      {!form2 ? (
        <>
          {" "}
          <Modal.Body style={{ marginLeft: "0.5rem" }}>
            <p style={{ color: "black" }}>
              To continue, please enter your password. This will disable
              two-step authentication entirely
            </p>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ color: "black" }}>
                  Email address
                </Form.Label>
                <Form.Control
                  className="dis-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label style={{ color: "black" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="your password"
                  value={confirmPass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                />
              </Form.Group>
              {wrongPass && (
                <span style={{ color: "red" }}> Wrong Password!</span>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {/* CHECK THE PASSWORD FROM API IF TRUE setForm2(true) else show error */}
            <Button
              variant="danger"
              disabled={confirmPass.length < 5 ? true : false}
              onClick={verifyPass}
            >
              Disable
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          {!form3 ? (
            <>
              <Modal.Body style={{ marginLeft: "0.5rem" }}>
                <p style={{ color: "black" }}>
                  Enter the authentication code below we sent to {phoneNumber} .
                </p>
                <Form>
                  <div className="otp-code">
                    {" "}
                    <OtpInput
                      value={verificationCode}
                      onChange={setVerificationCode}
                      numInputs={6}
                      renderInput={(inputProps) => <input {...inputProps} />}
                      renderSeparator={<span>-</span>}
                      inputStyle={{
                        width: "3rem",
                        height: "3rem",
                        margin: "0 0.2rem",

                        borderRadius: 2,

                        outline: "none",
                        textAlign: "center",
                        fontWeight: "400",
                      }}
                    />
                    {wrongCode && (
                      <div>
                        <MdError style={{ color: "red" }} />{" "}
                        <span style={{ color: "red" }}>
                          Incorrect verification code
                        </span>
                      </div>
                    )}
                    <p>Resend Code</p>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                {/* CHECK THE code if its wrong show error else setForm4(true) */}
                <Button
                  variant="primary"
                  onClick={() => {
                    setForm3(true);
                  }}
                >
                  Verify
                </Button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Body style={{ marginLeft: "0.5rem" }}>
                <div className="success2FA">
                  <AiOutlineCheckCircle size={30} />

                  <span>Two-step authentication disabled.</span>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleDone}>
                  Done
                </Button>
              </Modal.Footer>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default Disable2FA;
