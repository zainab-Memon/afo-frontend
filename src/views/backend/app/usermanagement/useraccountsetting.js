import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import countryList from "react-select-country-list";
import Select from "react-select";
// import AuthSession from "../../../../getSessionAuth";
import { Dropdown } from "react-bootstrap";
import user from "../../../../assets/images/user/user.jpg";
import { useTranslation } from "react-i18next";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
// img
// favorite img
import fav1 from "../../../../assets/images/favorite/01.jpg";
import fav2 from "../../../../assets/images/favorite/02.jpg";
import fav3 from "../../../../assets/images/favorite/03.jpg";
import fav4 from "../../../../assets/images/favorite/04.png";
import fav5 from "../../../../assets/images/favorite/05.jpg";
import Modal from "react-bootstrap/Modal";
// swipper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation, Thumbs, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import Enable2FA from "./2FA/Enable2FA";
import Disable2FA from "./2FA/Disable2FA";
import { HmacSHA256 } from "crypto-js";
import updateUserDetails from "../../../../Services/updateUserDetails";
import AuthSession from "../../../../Services/getSessionAuth";
SwiperCore.use([EffectFade, Navigation, Thumbs, Pagination]);
const UserAccountSetting = () => {
  // user details from session api

  const getSessionData = () => {
    const userDetails_Session = JSON.parse(localStorage.getItem("session"));
    return {
      _id: userDetails_Session._id,
      email: userDetails_Session.email,
      tfa: userDetails_Session.tfa,
      dob: userDetails_Session.dob
        ? userDetails_Session.dob.substring(0, 10)
        : "2021-09-02",
      language: userDetails_Session.language
        ? userDetails_Session.language
        : "unknown",
      gender: userDetails_Session.gender
        ? userDetails_Session.gender
        : "unknown",
      country: userDetails_Session.country
        ? userDetails_Session.country
        : "N/A",
    };
  };

  const [userDetails, setUserDetails] = useState(getSessionData());
  // 2fa active/inactive toggle
  const [switchState, setSwitchState] = useState(userDetails.tfa);
  // enable 2fa modal
  const [show, setShow] = useState(false);
  // disable 2fa modal
  const [inactiveshow, setInactiveShow] = useState(false);

  const handleSwitchChange = (checked) => {
    setSwitchState(checked);
    if (checked) {
      setShow(true);
    } else {
      setInactiveShow(true);
    }
  };

  const [editInfo, setEditInfo] = useState(false);
  const handleEdit = () => {
    setEditInfo(true);
  };
  // USER INFO
  const [userInfo, setUserInfo] = useState({
    dob: userDetails.dob,
    _id: userDetails._id,
  });
  // gender dropdown
  const [selectedGender, setSelectedGender] = useState();
  const handleGender = (e) => {
    setSelectedGender(e);
    setUserInfo({ ...userInfo, gender: e });
  };

  // language dropdown

  const [selectedlang, setSelectedlang] = useState();
  const handleLang = (e) => {
    setSelectedlang(e);
    setUserInfo({ ...userInfo, language: e });
  };
  // country dropdown
  const options = useMemo(() => countryList().getData(), []);

  const optionLabels = options.map((option) => option.label);

  const [selectedCountry, setSelectedCountry] = useState();
  const handleCountry = (e) => {
    setSelectedCountry(e);
    setUserInfo({ ...userInfo, country: e });
  };

  const handleSave = async () => {
    await updateUserDetails(userInfo);
    setEditInfo(false);
    await AuthSession();
    const updatedUserDetails = getSessionData();
    setUserDetails(updatedUserDetails);
    // setUserInfo(updatedUserDetails);
  };
  // const [editInfo, setEditInfo] = useState(false);
  // email
  // const [email, setEmail] = useState(
  //   localStorage.getItem("session")
  //     ? JSON.parse(localStorage.getItem("session")).email
  //     : "name@example.com"
  // );
  // const handleEdit = () => {
  //   setEditInfo(true);
  // };
  // // gender dropdown
  // const [selectedGender, setSelectedGender] = useState();
  // const handleGender = (e) => {
  //   setSelectedGender(e);
  //   setUserInfo({ ...userInfo, gender: e });
  // };
  // // language dropdown
  // const [selectedlang, setSelectedlang] = useState();
  // const handleLang = (e) => {
  //   setSelectedlang(e);
  //   setUserInfo({ ...userInfo, language: e });
  // };
  // // NEW USER INFO
  // const [userInfo, setUserInfo] = useState({
  //   dob: userDetails.dob,
  //   _id: userDetails_Session._id,
  //   // country: "",
  // });
  // const handleSave = async () => {
  //   await updateUserDetails(userInfo);
  //   setEditInfo(false);
  //   AuthSession();
  //   const updatedUserDetails = getSessionData();
  //   setUserDetails(updatedUserDetails);
  // };
  // console.log(userInfo);
  const { t } = useTranslation();
  // history:
  const userhistory = [
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 1,
      img: fav1,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 2,
      img: fav2,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 3,
      img: fav3,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 4,
      img: fav4,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 5,
      img: fav5,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 6,
      img: fav1,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 7,
      img: fav2,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 8,
      img: fav3,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 9,
      img: fav4,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 10,
      img: fav4,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 11,
      img: fav4,
    },
    {
      title: "Sand Dust",
      rating: "13+",
      runningTime: "2h 30m",
      id: 12,
      img: fav4,
    },
  ];

  // load more button
  const [load, setLoad] = useState(false);
  const handlLoadMore = () => {
    setLoad(true);
  };

  return (
    <>
      <section className="m-profile setting-wrapper">
        <Container>
          <h4 className="main-title mb-4">{t("account setting")}</h4>
          <Row>
            <Col lg="4" className="mb-3">
              <div className="sign-user_card ">
                <div className="text-center">
                  <div class="image-upload">
                    <label for="file-input">
                      <img
                        src={user}
                        className="rounded-circle img-fluid d-block mx-auto mb-3 user-profile-img"
                        alt="user"
                      />
                    </label>

                    <input id="file-input" type="file" />
                  </div>
                  <h4 className="mb-3 a-border pb-3">John Doe</h4>
                  {!editInfo ? (
                    <Link
                      to="#"
                      className="edit-icon text-primary"
                      onClick={handleEdit}
                    >
                      {t("edit")}
                    </Link>
                  ) : (
                    <Link
                      to="#"
                      className="edit-icon text-primary"
                      onClick={handleSave}
                    >
                      Save
                    </Link>
                  )}
                </div>

                <Row className="row align-items-center justify-content-between mb-3">
                  <Col md="8">
                    <span className="text-light font-size-13">
                      {t("email")}
                    </span>
                    <p className="mb-0">{userDetails.email}</p>
                  </Col>
                  {/* <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      {t("change")}
                    </Link>
                  </Col> */}
                </Row>
                <Row className="align-items-center justify-content-between mb-3">
                  <Col md="8">
                    <span className="text-light font-size-13">
                      {t("password")}
                    </span>
                    <p className="mb-0">**********</p>
                  </Col>
                  {/* <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      {t("change")}
                    </Link>
                  </Col> */}
                </Row>
                {!editInfo ? (
                  <>
                    <Row className="align-items-center justify-content-between mb-3 ">
                      <Col md="8">
                        <span className="text-light font-size-13">
                          {t("date of birth")}
                        </span>
                        <p className="mb-0">{userDetails.dob}</p>
                      </Col>
                      {/* <Col md="4" className="text-md-right text-left">
                        <Link to="#" className="text-primary">
                          {t("change")}
                        </Link>
                      </Col> */}
                    </Row>
                    <Row className="align-items-center justify-content-between mb-3">
                      <Col md="8">
                        <span className="text-light font-size-13">
                          {t("language")}
                        </span>
                        <p className="mb-0">{userDetails.language}</p>
                      </Col>
                    </Row>
                    <Row className="align-items-center justify-content-between mb-3">
                      <Col md="8">
                        <span className="text-light font-size-13">Gender</span>
                        <p className="mb-0">{userDetails.gender}</p>
                      </Col>
                    </Row>
                    <Row className="align-items-center justify-content-between mb-3">
                      <Col md="8">
                        <span className="text-light font-size-13">Country</span>
                        <p className="mb-0">{userDetails.country}</p>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row className="align-items-center justify-content-between mb-3 user-update-info">
                      <Col md="8">
                        <span className="text-light font-size-13">
                          {t("date of birth")}
                        </span>
                        <input
                          type="date"
                          value={userInfo.dob}
                          onChange={
                            (e) =>
                              setUserInfo({ ...userInfo, dob: e.target.value }) //setting the formData to the value input of the textfield
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="align-items-center justify-content-between mb-3 user-update-info">
                      <Col md="8">
                        <span className="text-light font-size-13">
                          {t("language")}
                        </span>
                        <Form.Group>
                          <Dropdown
                            className="gender-dropdown"
                            name="gender"
                            onSelect={handleLang}
                          >
                            <Dropdown.Toggle id="dropdown-basic">
                              {selectedlang ? selectedlang : "Choose Language"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="user-info-dropdown-menu">
                              <Dropdown.Item eventKey="english">
                                English
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="spanish">
                                Spanish
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="french">
                                French
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="english">
                                Italian
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="spanish">
                                Hindi
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="french">
                                Polski
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="align-items-center justify-content-between mb-3 user-update-info">
                      <Col md="8">
                        <span className="text-light font-size-13">Gender</span>
                        {/* <p className="mb-0">{userDetails.gender}</p> */}
                        <Form.Group>
                          <Dropdown
                            className="gender-dropdown"
                            name="gender"
                            onSelect={handleGender}
                          >
                            <Dropdown.Toggle id="dropdown-basic">
                              {selectedGender
                                ? selectedGender
                                : "Choose Gender"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="user-info-dropdown-menu">
                              <Dropdown.Item eventKey="Male">
                                Male
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Female">
                                Female
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Other">
                                Other
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="align-items-center justify-content-between mb-3 user-update-info">
                      <Col md="8">
                        <span className="text-light font-size-13">Country</span>
                        {/* <Select
                          options={options}
                          value={value}
                          onChange={changeHandler}
                          className="gender-dropdown"
                        /> */}
                        <Form.Group>
                          <Dropdown
                            className="gender-dropdown"
                            name="gender"
                            onSelect={handleCountry}
                          >
                            <Dropdown.Toggle id="dropdown-basic">
                              {selectedCountry
                                ? selectedCountry
                                : "Select Country"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="user-info-dropdown-menu">
                              {optionLabels.map((country) => {
                                return (
                                  <Dropdown.Item eventKey={country}>
                                    {country}
                                  </Dropdown.Item>
                                );
                              })}
                              {/* <Dropdown.Item eventKey="UK">Uk</Dropdown.Item>
                              <Dropdown.Item eventKey="USA">USA</Dropdown.Item>
                              <Dropdown.Item eventKey="Pakistan">
                                Pakistan
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="UK">Uk</Dropdown.Item>
                              <Dropdown.Item eventKey="USA">USA</Dropdown.Item>
                              <Dropdown.Item eventKey="Pakistan">
                                Pakistan
                              </Dropdown.Item> */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            </Col>
            <Col lg="8">
              <div className="sign-user_card">
                {/* <h5 className="mb-3 pb-3 a-border">{t("personal details")}</h5>
                <Row className="row align-items-center justify-content-between mb-3">
                  <Col md="8">
                    <span className="text-light font-size-13">
                      {t("email")}
                    </span>
                    <p className="mb-0">{t("example@gmail.com")}</p>
                  </Col>
                  <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      {t("change")}
                    </Link>
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-between mb-3">
                  <Col md="8">
                    <span className="text-light font-size-13">
                      {t("password")}
                    </span>
                    <p className="mb-0">**********</p>
                  </Col>
                  <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      {t("change")}
                    </Link>
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-between mb-3">
                  <Col md="8">
                    <span className="text-light font-size-13">
                      {t("date of birth")}
                    </span>
                    <p className="mb-0">08-03-1995</p>
                  </Col>
                  <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      {t("change")}
                    </Link>
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-between">
                  <Col md="8">
                    <span className="text-light font-size-13">
                      {t("language")}
                    </span>
                    <p className="mb-0">English</p>
                  </Col>
                  <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      {t("change")}
                    </Link>
                  </Col>
                </Row> */}
                {/* 2fa */}
                <h5 className="mb-3 mt-4 pb-3 a-border">
                  Two-Factor Authentication
                </h5>
                <Row className="justify-content-between mb-3">
                  <Col md="8" className="r-mb-15">
                    <p>
                      Setup your account to receive authentication codes via sms
                    </p>
                  </Col>
                  <div className="col-md-4 text-md-right text-left">
                    <div className="fa-btn">
                      <BootstrapSwitchButton
                        checked={switchState}
                        onlabel="Active"
                        offlabel="Inactive"
                        onChange={handleSwitchChange}
                        width={120}
                        offstyle="outline-secondary"
                        // onSwitchChange={handleSwitchChange}
                      />
                    </div>
                  </div>
                  <Enable2FA
                    show={show}
                    setShow={setShow}
                    setSwitchState={setSwitchState}
                  />
                  <Disable2FA
                    show={inactiveshow}
                    setShow={setInactiveShow}
                    setSwitchState={setSwitchState}
                  />
                </Row>
                <h5 className="mb-3 mt-4 pb-3 a-border">{t("plan details")}</h5>
                <Row className="justify-content-between mb-3">
                  <Col md="8">
                    <p>{t("premium")}</p>
                  </Col>
                  <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      {t("change plan")}
                    </Link>
                  </Col>
                </Row>
                {/* billing */}
                <h5 className="mb-3 mt-4 pb-3 a-border">
                  {t("billing details")}
                </h5>
                <Row className="justify-content-between mb-3">
                  <Col md="8" className="r-mb-15">
                    <p>Your next billing date is 19 September 2020.</p>
                    <Link to="#" className="btn btn-typ btn-hover">
                      {t("cancel membership")}
                    </Link>
                  </Col>
                  <div className="col-md-4 text-md-right text-left">
                    <Link to="#" className="text-primary">
                      {t("update payment info")}
                    </Link>
                  </div>
                </Row>
                <h6 className="mb-3 mt-4 ">Billing History</h6>
                <Row className="justify-content-between mb-3 bill-history">
                  <Col md="12" className="r-mb-15">
                    <div className="table-view">
                      <table
                        className="data-tables table movie_table "
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Date</th>

                            <th>Service Period</th>
                            <th>Payment Method</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>05/04/2023</td>

                            <td>05/04/2023—04/05/2023</td>
                            <td>•••• •••• •••• 9098</td>
                            <td>10$</td>
                          </tr>
                          <tr>
                            <td>05/04/2023</td>

                            <td>05/04/2023—04/05/2023</td>
                            <td>•••• •••• •••• 9098</td>
                            <td>10$</td>
                          </tr>
                          <tr>
                            <td>05/04/2023</td>

                            <td>05/04/2023—04/05/2023</td>
                            <td>•••• •••• •••• 9098</td>
                            <td>10$</td>
                          </tr>
                          <tr>
                            <td>05/04/2023</td>

                            <td>05/04/2023—04/05/2023</td>
                            <td>•••• •••• •••• 9098</td>
                            <td>10$</td>
                          </tr>
                          <tr>
                            <td>05/04/2023</td>

                            <td>05/04/2023—04/05/2023</td>
                            <td>•••• •••• •••• 9098</td>
                            <td>10$</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          {/* sliders */}
          {/* fav--------------------------------- */}
          {/* <Row>
            <Col sm="12" className="overflow-hidden">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="main-title">{t("my favourites")}</h4>
              </div>
              <div id="favorites-contens">
                <div id="prev" className="swiper-button swiper-button-prev">
                  <i className="fa fa-chevron-left"></i>
                </div>
                <div id="next" className="swiper-button swiper-button-next">
                  <i className="fa fa-chevron-right"></i>
                </div>
                <Swiper
                  navigation={{
                    prevEl: "#prev",
                    nextEl: "#next",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 4 },
                    1400: { slidesPerView: 4 },
                  }}
                  loop={true}
                  slidesPerView={4}
                  spaceBetween={20}
                  as="ul"
                  className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction"
                >
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav1} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Sand Dust</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            13+
                          </div>
                          <span className="text-white">2h 30m</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav2} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Last Race</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            7+
                          </div>
                          <span className="text-white">2 Seasons</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav3} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Boop Bitty</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            15+
                          </div>
                          <span className="text-white">2h 30m</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav4} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Dino Land</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            18+
                          </div>
                          <span className="text-white">3 Seasons</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav5} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Jaction action</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            10+
                          </div>
                          <span className="text-white">1 Season</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </Col>
          </Row> */}

          {/* watch list slider---------------------------------------- */}
          {/* <Row>
            <Col sm="12" className="overflow-hidden">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="main-title">{t("my watchlist")}</h4>
              </div>
              <div id="suggestede-contens">
                <div id="prev1" className="swiper-button swiper-button-prev">
                  <i className="fa fa-chevron-left"></i>
                </div>
                <div id="next1" className="swiper-button swiper-button-next">
                  <i className="fa fa-chevron-right"></i>
                </div>
                <Swiper
                  navigation={{
                    prevEl: "#prev1",
                    nextEl: "#next1",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 4 },
                    1400: { slidesPerView: 4 },
                  }}
                  loop={true}
                  slidesPerView={4}
                  spaceBetween={20}
                  as="ul"
                  className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction"
                >
                  <SwiperSlide as="li">
                    <div className=" block-images position-relative">
                      <div className="img-box">
                        <img src={fav1} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Sand Dust</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            13+
                          </div>
                          <span className="text-white">2h 30m</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav2} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Last Race</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            7+
                          </div>
                          <span className="text-white">2 Seasons</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav3} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Boop Bitty</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            15+
                          </div>
                          <span className="text-white">2h 30m</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav4} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Dino Land</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            18+
                          </div>
                          <span className="text-white">3 Seasons</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav5} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Jaction action</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            10+
                          </div>
                          <span className="text-white">1 Season</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </Col>
          </Row> */}
          {/* history ---------------------
           */}
          {/* <Row>
            <Col sm="12" className="overflow-hidden">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="main-title pb-3">{t("my history")}</h4>
              </div>
              <div>
                <div id="upcoming-contens">
                  <ul className="list-inline mb-0 iq-rtl-direction row">
                    {userhistory.length > 0 &&
                      userhistory.map((movie) => (
                        <li
                          className="slide-item  mb-4 col-lg-3 col-md-4 col-sm-6"
                          key={movie.id}
                        >
                          <div className=" block-images position-relative">
                            <div className="img-box">
                              <img
                                src={movie.img}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                            <div className="block-description">
                              <h6 className="iq-title">
                                <Link to="/show-details">{movie.title}</Link>
                              </h6>
                              <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                <div className="badge badge-secondary p-1 mr-2">
                                  {movie.rating}
                                </div>
                                <span className="text-white">
                                  {movie.runningTime}
                                </span>
                              </div>
                              <div className="hover-buttons">
                                <Link
                                  to="/show-details"
                                  role="button"
                                  className="btn btn-hover iq-button"
                                >
                                  <i
                                    className="fa fa-play mr-1"
                                    aria-hidden="true"
                                  ></i>
                                  Play Now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  {!load && (
                    <button
                      className="btn btn-hover "
                      type="button"
                      onClick={handlLoadMore}
                    >
                      <span>{t("load more")}</span>
                    </button>
                  )}

                  <div>
                    <ul className="list-inline  mb-0 iq-rtl-direction  row">
                      {load &&
                        userhistory.map((movie) => (
                          <li
                            className="slide-item  mb-4 col-lg-3 col-md-4 col-sm-6"
                            key={movie.id}
                          >
                            <div className=" block-images position-relative">
                              <div className="img-box">
                                <img
                                  src={movie.img}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="block-description">
                                <h6 className="iq-title">
                                  <Link to="/show-details">{movie.title}</Link>
                                </h6>
                                <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                  <div className="badge badge-secondary p-1 mr-2">
                                    {movie.rating}
                                  </div>
                                  <span className="text-white">
                                    {movie.runningTime}
                                  </span>
                                </div>
                                <div className="hover-buttons">
                                  <Link
                                    to="/show-details"
                                    role="button"
                                    className="btn btn-hover iq-button"
                                  >
                                    <i
                                      className="fa fa-play mr-1"
                                      aria-hidden="true"
                                    ></i>
                                    Play Now
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row> */}
        </Container>
        <Container fluid>
          {/* fav slider */}
          <Row>
            <Col sm="12" className="overflow-hidden">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="main-title" style={{ paddingTop: "2rem" }}>
                  {t("my favourites")}
                </h4>
              </div>
              <div id="favorites-contens">
                <div id="prev" className="swiper-button swiper-button-prev">
                  <i className="fa fa-chevron-left"></i>
                </div>
                <div id="next" className="swiper-button swiper-button-next">
                  <i className="fa fa-chevron-right"></i>
                </div>
                <Swiper
                  navigation={{
                    prevEl: "#prev",
                    nextEl: "#next",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 4 },
                    1400: { slidesPerView: 4 },
                  }}
                  loop={true}
                  slidesPerView={4}
                  spaceBetween={20}
                  as="ul"
                  className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction"
                >
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav1} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Sand Dust</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            13+
                          </div>
                          <span className="text-white">2h 30m</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-typ btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav2} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Last Race</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            7+
                          </div>
                          <span className="text-white">2 Seasons</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-typ btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav3} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Boop Bitty</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            15+
                          </div>
                          <span className="text-white">2h 30m</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-typ btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav4} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Dino Land</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            18+
                          </div>
                          <span className="text-white">3 Seasons</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-typ btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav5} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Jaction action</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            10+
                          </div>
                          <span className="text-white">1 Season</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-typ btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </Col>
          </Row>
          {/* watchlist slider */}
          <Row>
            <Col sm="12" className="overflow-hidden">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="main-title">{t("my watchlist")}</h4>
              </div>
              <div id="suggestede-contens">
                <div id="prev1" className="swiper-button swiper-button-prev">
                  <i className="fa fa-chevron-left"></i>
                </div>
                <div id="next1" className="swiper-button swiper-button-next">
                  <i className="fa fa-chevron-right"></i>
                </div>
                <Swiper
                  navigation={{
                    prevEl: "#prev1",
                    nextEl: "#next1",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 4 },
                    1400: { slidesPerView: 4 },
                  }}
                  loop={true}
                  slidesPerView={4}
                  spaceBetween={20}
                  as="ul"
                  className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction"
                >
                  <SwiperSlide as="li">
                    <div className=" block-images position-relative">
                      <div className="img-box">
                        <img src={fav1} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Sand Dust</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            13+
                          </div>
                          <span className="text-white">2h 30m</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover btn-typ iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav2} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Last Race</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            7+
                          </div>
                          <span className="text-white">2 Seasons</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover btn-typ iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav3} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Boop Bitty</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            15+
                          </div>
                          <span className="text-white">2h 30m</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover btn-typ iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav4} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Dino Land</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            18+
                          </div>
                          <span className="text-white">3 Seasons</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-hover btn-typ iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide as="li">
                    <div className="block-images position-relative">
                      <div className="img-box">
                        <img src={fav5} className="img-fluid" alt="" />
                      </div>
                      <div className="block-description">
                        <h6 className="iq-title">
                          <Link to="/show-details">Jaction action</Link>
                        </h6>
                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                          <div className="badge badge-secondary p-1 mr-2">
                            10+
                          </div>
                          <span className="text-white">1 Season</span>
                        </div>
                        <div className="hover-buttons">
                          <Link
                            to="/show-details"
                            role="button"
                            className="btn btn-typ btn-hover iq-button"
                          >
                            <i
                              className="fa fa-play mr-1"
                              aria-hidden="true"
                            ></i>
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </Col>
          </Row>
          {/* history slider */}
          <Row>
            <Col sm="12" className="overflow-hidden">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="main-title pb-3">{t("my history")}</h4>
              </div>
              <div>
                <div id="upcoming-contens">
                  <ul className="list-inline mb-0 iq-rtl-direction row">
                    {userhistory.length > 0 &&
                      userhistory.map((movie) => (
                        <li
                          className="slide-item  mb-4 col-lg-3 col-md-4 col-sm-6"
                          key={movie.id}
                        >
                          <div className=" block-images position-relative">
                            <div className="img-box">
                              <img
                                src={movie.img}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                            <div className="block-description">
                              <h6 className="iq-title">
                                <Link to="/show-details">{movie.title}</Link>
                              </h6>
                              <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                <div className="badge badge-secondary p-1 mr-2">
                                  {movie.rating}
                                </div>
                                <span className="text-white">
                                  {movie.runningTime}
                                </span>
                              </div>
                              <div className="hover-buttons">
                                <Link
                                  to="/show-details"
                                  role="button"
                                  className="btn btn-hover iq-button btn-typ"
                                >
                                  <i
                                    className="fa fa-play mr-1"
                                    aria-hidden="true"
                                  ></i>
                                  Play Now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  {!load && (
                    <button
                      className="btn btn-hover btn-typ "
                      type="button"
                      onClick={handlLoadMore}
                    >
                      <span>{t("load more")}</span>
                    </button>
                  )}

                  <div>
                    <ul className="list-inline  mb-0 iq-rtl-direction  row">
                      {load &&
                        userhistory.map((movie) => (
                          <li
                            className="slide-item  mb-4 col-lg-3 col-md-4 col-sm-6"
                            key={movie.id}
                          >
                            <div className=" block-images position-relative">
                              <div className="img-box">
                                <img
                                  src={movie.img}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="block-description">
                                <h6 className="iq-title">
                                  <Link to="/show-details">{movie.title}</Link>
                                </h6>
                                <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                  <div className="badge badge-secondary p-1 mr-2">
                                    {movie.rating}
                                  </div>
                                  <span className="text-white">
                                    {movie.runningTime}
                                  </span>
                                </div>
                                <div className="hover-buttons">
                                  <Link
                                    to="/show-details"
                                    role="button"
                                    className="btn btn-hover iq-button btn-typ "
                                  >
                                    <i
                                      className="fa fa-play mr-1"
                                      aria-hidden="true"
                                    ></i>
                                    Play Now
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
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

export default UserAccountSetting;
