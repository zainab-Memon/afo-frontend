import React, { useState } from "react";
import { Container, Row, Col, Navbar, Dropdown, Nav } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "../../../../components/Card";

import CustomToggle from "../../../../components/dropdowns";
// MULTI LANG HOOK
import { useTranslation } from "react-i18next";
import AuthSession from "../../../../getSessionAuth";
//img

import logo from "../../../../assets/images/logo.png";
import thumb1 from "../../../../assets/images/notify/thumb-1.jpg";
import thumb2 from "../../../../assets/images/notify/thumb-2.jpg";
import thumb3 from "../../../../assets/images/notify/thumb-3.jpg";
import user from "../../../../assets/images/user/user.jpg";
// flags
import spain from "../../../../assets/images/flags/spain.png";
import uk from "../../../../assets/images/flags/uk.png";
import france from "../../../../assets/images/flags/france.png";
import german from "../../../../assets/images/flags/german.png";
import italy from "../../../../assets/images/flags/italy.png";
import poland from "../../../../assets/images/flags/poland.png";
const languages = [
  { code: "en", name: "English", icon: uk },
  { code: "fr", name: "French", icon: france },
  { code: "de", name: "Deutsch", icon: german },
  { code: "es", name: "Espanol", icon: spain },
  { code: "it", name: "Italiano", icon: italy },
  { code: "pl", name: "Polski", icon: poland },
];

const HeaderStyle1 = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageSelect = (eventKey) => {
    const selectedLang = languages.find((lang) => lang.name === eventKey);
    setSelectedLanguage(selectedLang);

    i18n.changeLanguage(selectedLang.code);
    localStorage.setItem("lang", selectedLang.code);
  };

  //Calling t and i18n method from useTranslation hook
  const { t, i18n } = useTranslation();

  //Creating a method to change the language onChnage from select box
  // const changeLanguageHandler = (e) => {
  //   const languageValue = e.target.value;
  //   i18n.changeLanguage(languageValue);
  //   // setting to local storage
  //   localStorage.setItem("lang", languageValue);
  // };
  let history = useHistory("");
  // handle click
  const handleprofileClick = async () => {
    const result = await AuthSession();
    if (result) {
      history.push("/home/setting");
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <header id="main-header">
        <div className="main-header">
          <Container fluid>
            <Row>
              <Col sm="12">
                <Navbar expand="lg" className="p-0">
                  <Navbar.Toggle className="c-toggler">
                    <div className="navbar-toggler-icon">
                      <span className="navbar-menu-icon navbar-menu-icon--top"></span>
                      <span className="navbar-menu-icon navbar-menu-icon--middle"></span>
                      <span className="navbar-menu-icon navbar-menu-icon--bottom"></span>
                    </div>
                  </Navbar.Toggle>
                  <Navbar.Brand className="navbar-brand" href="/">
                    <img className="img-fluid logo" src={logo} alt="streamit" />
                  </Navbar.Brand>
                  <Dropdown className="mobile-more-menu">
                    <Dropdown.Toggle
                      to="#"
                      as={CustomToggle}
                      variant="more-toggle"
                    >
                      <i className="ri-more-line"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="more-menu">
                      <div className="navbar-right position-relative">
                        <ul className="d-flex align-items-center justify-content-end list-inline m-0">
                          <Dropdown as="li" className="nav-item m-">
                            <Dropdown.Toggle
                              href="#"
                              as={CustomToggle}
                              variant="search-toggle"
                            >
                              <i className="ri-search-line"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="search-box iq-search-bar d-search p-0 m-0 dropdown-menu-right">
                              <Form action="#" className="searchbox">
                                <div className="position-relative">
                                  <input
                                    type="text"
                                    className="text search-input font-size-12"
                                    placeholder="type here to search..."
                                  />
                                  <i className="search-link ri-search-line"></i>
                                </div>
                              </Form>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Dropdown as="li" className="nav-item m-0">
                            <Dropdown.Toggle
                              href="#"
                              as={CustomToggle}
                              variant="search-toggle position-relative"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="22"
                                height="22"
                                className="noti-svg"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M18 10a6 6 0 1 0-12 0v8h12v-8zm2 8.667l.4.533a.5.5 0 0 1-.4.8H4a.5.5 0 0 1-.4-.8l.4-.533V10a8 8 0 1 1 16 0v8.667zM9.5 21h5a2.5 2.5 0 1 1-5 0z" />
                              </svg>
                              <span className="bg-danger dots"></span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="iq-sub-dropdown dropdown-menu dropdown-menu-right">
                              <Card className="iq-card shadow-none m-0">
                                <Card.Body className="iq-card-body">
                                  <Link to="#" className="iq-sub-card">
                                    <div className="media align-items-center">
                                      <img
                                        src={thumb1}
                                        className="img-fluid mr-3"
                                        alt="streamit"
                                      />
                                      <div className="media-body">
                                        <h6 className="mb-0 ">Boot Bitty</h6>
                                        <small className="font-size-12">
                                          {" "}
                                          just now
                                        </small>
                                      </div>
                                    </div>
                                  </Link>
                                  <Link to="#" className="iq-sub-card">
                                    <div className="media align-items-center">
                                      <img
                                        src={thumb2}
                                        className="img-fluid mr-3"
                                        alt="streamit"
                                      />
                                      <div className="media-body">
                                        <h6 className="mb-0 ">
                                          The Last Breath
                                        </h6>
                                        <small className="font-size-12">
                                          15 minutes ago
                                        </small>
                                      </div>
                                    </div>
                                  </Link>
                                  <Link to="#" className="iq-sub-card">
                                    <div className="media align-items-center">
                                      <img
                                        src={thumb3}
                                        className="img-fluid mr-3"
                                        alt="streamit"
                                      />
                                      <div className="media-body">
                                        <h6 className="mb-0 ">The Hero Camp</h6>
                                        <small className="font-size-12">
                                          1 hour ago
                                        </small>
                                      </div>
                                    </div>
                                  </Link>
                                </Card.Body>
                              </Card>
                            </Dropdown.Menu>
                          </Dropdown>
                        </ul>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Navbar.Collapse className="">
                    <div className="menu-main-menu-container">
                      <Nav as="ul" id="top-menu" className="ml-auto">
                        <li className="menu-item">
                          <Link to="/">Home</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/">Genre</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/">Movies</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/">Videos</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/">Podcast</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/">Tv Shows</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/">Live Channels</Link>
                        </li>
                      </Nav>
                    </div>
                  </Navbar.Collapse>
                  <div className="navbar-right menu-right">
                    <ul className="d-flex align-items-center list-inline m-0">
                      <Dropdown as="li" className="nav-item nav-icon">
                        <Dropdown.Toggle
                          as={CustomToggle}
                          href="#"
                          variant="search-toggle device-search"
                        >
                          <i className="ri-search-line"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          className="search-box iq-search-bar d-search p-0 m-0"
                          align="right"
                        >
                          <Form action="#" className="searchbox">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="text search-input font-size-12"
                                placeholder="type here to search..."
                              />
                              <i className="search-link ri-search-line"></i>
                            </div>
                          </Form>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown as="li" className="nav-item">
                        <Dropdown.Toggle
                          href="#"
                          as={CustomToggle}
                          variant="search-toggle position-relative"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="22"
                            height="22"
                            className="noti-svg"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M18 10a6 6 0 1 0-12 0v8h12v-8zm2 8.667l.4.533a.5.5 0 0 1-.4.8H4a.5.5 0 0 1-.4-.8l.4-.533V10a8 8 0 1 1 16 0v8.667zM9.5 21h5a2.5 2.5 0 1 1-5 0z" />
                          </svg>
                          <span className="bg-danger dots"></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          className="iq-sub-dropdown"
                          align="right"
                        >
                          <Card className="shadow-none m-0">
                            <Card.Body>
                              <Link to="#" className="iq-sub-card">
                                <div className="media align-items-center">
                                  <img
                                    src={thumb1}
                                    className="img-fluid mr-3"
                                    alt="streamit"
                                  />
                                  <div className="media-body">
                                    <h6 className="mb-0 ">Boot Bitty</h6>
                                    <small className="font-size-12">
                                      {" "}
                                      just now
                                    </small>
                                  </div>
                                </div>
                              </Link>
                              <Link to="#" className="iq-sub-card">
                                <div className="media align-items-center">
                                  <img
                                    src={thumb2}
                                    className="img-fluid mr-3"
                                    alt="streamit"
                                  />
                                  <div className="media-body">
                                    <h6 className="mb-0 ">The Last Breath</h6>
                                    <small className="font-size-12">
                                      15 minutes ago
                                    </small>
                                  </div>
                                </div>
                              </Link>
                              <Link to="#" className="iq-sub-card">
                                <div className="media align-items-center">
                                  <img
                                    src={thumb3}
                                    className="img-fluid mr-3"
                                    alt="streamit"
                                  />
                                  <div className="media-body">
                                    <h6 className="mb-0 ">The Hero Camp</h6>
                                    <small className="font-size-12">
                                      1 hour ago
                                    </small>
                                  </div>
                                </div>
                              </Link>
                            </Card.Body>
                          </Card>
                        </Dropdown.Menu>
                      </Dropdown>
                      <div className="select-lang">
                        <Dropdown className="nav-item nav-icon">
                          <Dropdown.Toggle as={CustomToggle}>
                            <img
                              src={selectedLanguage.icon}
                              alt="flag"
                              className="img-fluid rounded-circle"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "0.6rem",
                              }}
                            />
                            {selectedLanguage.code}
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className="iq-sub-dropdown "
                            align="right"
                            style={{ color: "white" }}
                          >
                            {languages.map((lang) => (
                              <Dropdown.Item
                                key={lang.code}
                                eventKey={lang.name}
                                onSelect={handleLanguageSelect}
                              >
                                <img
                                  src={lang.icon}
                                  alt="flag"
                                  style={{ width: "20%", marginRight: "11px" }}
                                />
                                {lang.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                          {/* <Dropdown.Menu
                          className="iq-sub-dropdown "
                          align="right"
                        >
                          {languages.map((lang) => (
                            <Dropdown.Item
                              key={lang.code}
                              eventKey={lang.name}
                              onSelect={handleLanguageSelect}
                            >
                              <img
                                src={lang.icon}
                                alt="flag"
                                style={{ width: "20%", marginRight: "11px" }}
                              />
                              {lang.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu> */}
                        </Dropdown>
                      </div>
                      {/* <div className="select-lang">
                        <Dropdown as="li" className="line-height pt-2 ">
                          <Dropdown.Toggle
                            href="#"
                            as={CustomToggle}
                            variant="search-toggle iq-waves-effect d-flex align-items-center"
                          >
                            <img
                              src={selectedLanguage.icon}
                              alt="flag"
                              className="img-fluid rounded-circle"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "0.6rem",
                              }}
                            />
                            {selectedLanguage.code}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {languages.map((lang) => (
                              <Dropdown.Item
                                key={lang.code}
                                eventKey={lang.name}
                                onSelect={handleLanguageSelect}
                              >
                                <img
                                  src={lang.icon}
                                  alt="flag"
                                  style={{ width: "20%", marginRight: "11px" }}
                                />
                                {lang.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div> */}

                      <Dropdown as="li" className="nav-item nav-icon">
                        <Dropdown.Toggle
                          href="#"
                          as={CustomToggle}
                          variant="search-toggle"
                        >
                          <div
                            className="iq-user-dropdown search-toggle p-0 d-flex align-items-center active"
                            data-toggle="search-toggle"
                          >
                            <img
                              src={user}
                              className="img-fluid avatar-40 rounded-circle"
                              alt="user"
                            />
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          className="iq-sub-dropdown iq-user-dropdown"
                          align="right"
                        >
                          <Card className="shadow-none m-0">
                            <Card.Body className="p-0 pl-3 pr-3">
                              <Link
                                to="/profile/setting"
                                // onClick={handleprofileClick}
                                className="iq-sub-card setting-dropdown"
                              >
                                <div className="media align-items-center">
                                  <div className="right-icon">
                                    <i className="ri-file-user-line text-primary"></i>
                                  </div>
                                  <div className="media-body ml-3">
                                    <h6 className="my-0 ">Manage Profile</h6>
                                  </div>
                                </div>
                              </Link>
                              <Link
                                to="#"
                                className="iq-sub-card setting-dropdown"
                              >
                                <div className="media align-items-center">
                                  <div className="right-icon">
                                    <i className="ri-settings-4-line text-primary"></i>
                                  </div>
                                  <div className="media-body ml-3">
                                    <h6 className="my-0 ">Pricing Plan</h6>
                                  </div>
                                </div>
                              </Link>
                              <Link
                                to="/extra-pages/login"
                                className="iq-sub-card setting-dropdown"
                                onClick={() => {
                                  localStorage.removeItem("token");
                                  localStorage.removeItem("session");
                                }}
                              >
                                <div className="media align-items-center">
                                  <div className="right-icon">
                                    <i className="ri-logout-circle-line text-primary"></i>
                                  </div>
                                  <div className="media-body ml-3">
                                    <h6 className="my-0 ">Logout</h6>
                                  </div>
                                </div>
                              </Link>
                            </Card.Body>
                          </Card>
                        </Dropdown.Menu>
                      </Dropdown>

                      {/* <Form>
                        <select
                          onChange={changeLanguageHandler}
                          className="select-list"
                        >
                          <option value="en">English </option>
                          <option value="fr">French</option>
                          <option value="de">Deutsch</option>
                          <option value="pl">Polski</option>
                          <option value="it">Italiano</option>
                          <option value="es">Espanol</option>
                        </select>
                      </Form> */}
                    </ul>
                  </div>
                </Navbar>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
    </>
  );
};

export default HeaderStyle1;
