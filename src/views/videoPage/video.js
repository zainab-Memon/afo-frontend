import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button, Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation, Thumbs, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import FsLightbox from "fslightbox-react";
import { gsap } from "gsap";

import banner1 from "../../assets/images/shows-banner/show-1.jpg";
import banner2 from "../../assets/images/shows-banner/show-2.jpg";
import banner3 from "../../assets/images/shows-banner/show-3.jpg";
import img1 from "../../assets/images/tvthrillers/01.jpg";
import img2 from "../../assets/images/tvthrillers/02.jpg";
import img3 from "../../assets/images/tvthrillers/03.jpg";
import img4 from "../../assets/images/tvthrillers/04.jpg";
import img5 from "../../assets/images/tvthrillers/05.jpg";
import img6 from "../../assets/images/tvthrillers/06.jpg";
import img7 from "../../assets/images/tvthrillers/07.jpg";
import img8 from "../../assets/images/tvthrillers/08.jpg";

import {
  MainSliderApi,
  TrendingApi,
  RecommendedApi,
  SuggestedApi,
} from "../../Services/SliderApi";
// install Swiper modules
SwiperCore.use([EffectFade, Navigation, Thumbs, Pagination]);

const Video = () => {
  const [mainSliderData, setMainSliderData] = useState([]);
  const [suggestedData, setSuggestedData] = useState([]);
  const [trendingApiData, setTrendingApiData] = useState([]);
  const [recommandedData, setRecommandedData] = useState([]);
  const [toggler1, setToggler1] = useState(false);

  useEffect(() => {
    MainSliderApi()
      .then((data) => {
        setMainSliderData(data.allSliders);
        console.log(data.allSliders, "SLiders ka response");
      })
      .catch((error) => {
        console.log(error, "Main Slider error");
      });
  }, []);
  // Trending data
  useEffect(() => {
    TrendingApi()
      .then((data) => {
        setTrendingApiData(data.upcomingContent);
      })
      .catch((error) => {
        console.log(error, "TrendingApiData Slider error");
      });
  }, []);
  // Recommanded data
  useEffect(() => {
    RecommendedApi()
      .then((data) => {
        setRecommandedData(data.upcomingContent);
      })
      .catch((error) => {
        console.log(error, "Recommanded Slider error");
      });
  }, []);

  useEffect(() => {
    SuggestedApi()
      .then((data) => {
        setSuggestedData(data.upcomingContent);
      })
      .catch((error) => {
        console.log(error, "Suggested Slider error");
      });
  }, []);
  return (
    <>
      <section id="tvshow" className="iq-main-slider p-0">
        <div id="prev" className="swiper-button swiper-button-prev">
          <i className="ri-arrow-left-s-line"></i>
        </div>
        <div id="next" className="swiper-button swiper-button-next">
          <i className="ri-arrow-right-s-line"></i>
        </div>
        <Swiper
          slidesPerView={2}
          navigation={{
            prevEl: "#prev",
            nextEl: "#next",
          }}
          loop={true}
          centeredSlides={true}
          id="tvshows-slider"
          className="iq-rtl-direction"
        >
          {mainSliderData.map((mainSlider) => (
            <SwiperSlide>
              <Link to="/show-details">
                <div className="shows-img">
                  <img
                    src={
                      mainSlider?.general_content?.thumbnail
                        ?.banner_thumbnail_url
                    }
                    className="w-100"
                    alt=""
                  />
                  <div className="shows-content">
                    <h1
                      className="slider-text big-title title text-uppercase"
                      data-iq-gsap="onStart"
                      data-iq-position-x="-200"
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {mainSlider?.general_content?.media?.title}
                    </h1>
                    <p
                      data-iq-gsap="onStart"
                      data-iq-position-y="80"
                      data-iq-delay="0.8"
                      style={{ WebkitLineClamp: 3 }}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry.
                    </p>
                    <div className="movie-time d-flex align-items-center">
                      <div className="badge badge-secondary p-1 mr-2">18+</div>
                      <span className="text-white">3 Seasons</span>
                    </div>
                    <div
                      className="d-flex r-mb-23 mt-4"
                      data-iq-gsap="onStart"
                      data-iq-position-y="80"
                      data-iq-delay="0.8"
                    >
                      <Link
                        to={`/movie-details/${mainSlider.general_content.media._id}`}
                        className="btn btn-hover iq-button"
                      >
                        <i className="fa fa-play mr-2" aria-hidden="true"></i>
                        Play Now
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <Dropdown className="genres-box">
          <Dropdown.Toggle as={Button} variant="secondary" className="">
            Genres
          </Dropdown.Toggle>
          <Dropdown.Menu className="three-column">
            <Dropdown.Item href="#">Hindi</Dropdown.Item>
            <Dropdown.Item href="#">Tamil</Dropdown.Item>
            <Dropdown.Item href="#">Punjabi</Dropdown.Item>
            <Dropdown.Item href="#">English</Dropdown.Item>
            <Dropdown.Item href="#">Comedies</Dropdown.Item>
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Romance</Dropdown.Item>
            <Dropdown.Item href="#">Dramas</Dropdown.Item>
            <Dropdown.Item href="#">Bollywood</Dropdown.Item>
            <Dropdown.Item href="#">Hollywood</Dropdown.Item>
            <Dropdown.Item href="#">Children & Family</Dropdown.Item>
            <Dropdown.Item href="#">Award-Winning</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </section>
      <div className="main-content">
        <section id="iq-favorites">
          <Container fluid>
            <Row>
              <Col sm="12" className="overflow-hidden">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="main-title">Popular Shows</h4>
                </div>
                <div id="favorites-contens">
                  <div id="prev1" className="swiper-button swiper-button-prev">
                    <i className="fa fa-chevron-left"></i>
                  </div>
                  <div id="next1" className="swiper-button swiper-button-next">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={{
                      prevEl: "#prev1",
                      nextEl: "#next1",
                    }}
                    loop={true}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      550: { slidesPerView: 2 },
                      991: { slidesPerView: 3 },
                      1400: { slidesPerView: 4 },
                    }}
                    className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction"
                  >
                    {trendingApiData.map((data) => (
                      <SwiperSlide className="slide-item">
                        <div className="block-images1 block-images position-relative">
                          <div className="img-box">
                            <img
                              src={data?.thumbnail?.banner_thumbnail_url}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="block-description">
                            <h6 className="iq-title">
                              <Link to="/movie-details">
                                {data?.media?.title}{" "}
                              </Link>
                            </h6>
                            <div className="movie-time d-flex align-items-center my-2">
                              <div className="badge badge-secondary p-1 mr-2">
                                15+
                              </div>
                              <span className="text-white">2 Seasons</span>
                            </div>
                            <div className="hover-buttons">
                              <Link
                                to="/movie-details"
                                role="button"
                                className="btn btn-hover"
                              >
                                <i
                                  className="fa fa-play mr-1"
                                  aria-hidden="true"
                                ></i>
                                Play Now
                              </Link>
                            </div>
                          </div>
                          <div className="block-social-info">
                            <ul className="list-inline p-0 m-0 music-play-lists">
                              <li className="share">
                                <span>
                                  <i className="ri-share-fill"></i>
                                </span>
                                <div className="share-box">
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="share-ico"
                                      tabIndex="0"
                                    >
                                      <i className="ri-facebook-fill"></i>
                                    </Link>
                                    <Link
                                      to="https://twitter.com/intent/tweet?text=Currentlyreading"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="share-ico"
                                      tabIndex="0"
                                    >
                                      <i className="ri-twitter-fill"></i>
                                    </Link>
                                    <Link
                                      to="#"
                                      data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                      className="share-ico iq-copy-link"
                                      tabIndex="0"
                                    >
                                      <i className="ri-links-fill"></i>
                                    </Link>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <span>
                                  <i className="ri-heart-fill"></i>
                                </span>
                                <span className="count-box">19+</span>
                              </li>
                              <li>
                                <span>
                                  <i className="ri-add-line"></i>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section id="iq-upcoming-movie">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 overflow-hidden">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="main-title">Best Of International Shows</h4>
                </div>
                <div id="upcoming-contens">
                  <div id="prev2" className="swiper-button swiper-button-prev">
                    <i className="fa fa-chevron-left"></i>
                  </div>
                  <div id="next2" className="swiper-button swiper-button-next">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={{
                      nextEl: "#prev2",
                      prevEl: "#next2",
                    }}
                    loop={true}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      550: { slidesPerView: 2 },
                      991: { slidesPerView: 3 },
                      1400: { slidesPerView: 4 },
                    }}
                    className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction"
                  >
                    {suggestedData.map((data) => (
                      <SwiperSlide className="slide-item">
                        <div className="block-images1 block-images position-relative">
                          <div className="img-box">
                            <img
                              src={data?.thumbnail?.motion_thumbnail_url}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="block-description">
                            <h6 className="iq-title">
                              <Link to="/movie-details">
                                {data?.media?.title}
                              </Link>
                            </h6>
                            <div className="movie-time d-flex align-items-center my-2">
                              <div className="badge badge-secondary p-1 mr-2">
                                19+
                              </div>
                              <span className="text-white">3 Seasons</span>
                            </div>
                            <div className="hover-buttons">
                              <Link
                                to="/movie-details"
                                role="button"
                                className="btn btn-hover"
                              >
                                <i
                                  className="fa fa-play mr-1"
                                  aria-hidden="true"
                                ></i>
                                Play Now
                              </Link>
                            </div>
                          </div>
                          <div className="block-social-info">
                            <ul className="list-inline p-0 m-0 music-play-lists">
                              <li className="share">
                                <span>
                                  <i className="ri-share-fill"></i>
                                </span>
                                <div className="share-box">
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="share-ico"
                                      tabIndex="0"
                                    >
                                      <i className="ri-facebook-fill"></i>
                                    </Link>
                                    <Link
                                      to="https://twitter.com/intent/tweet?text=Currentlyreading"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="share-ico"
                                      tabIndex="0"
                                    >
                                      <i className="ri-twitter-fill"></i>
                                    </Link>
                                    <Link
                                      to="#"
                                      data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                      className="share-ico iq-copy-link"
                                      tabIndex="0"
                                    >
                                      <i className="ri-links-fill"></i>
                                    </Link>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <span>
                                  <i className="ri-heart-fill"></i>
                                </span>
                                <span className="count-box">19+</span>
                              </li>
                              <li>
                                <span>
                                  <i className="ri-add-line"></i>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="iq-suggestede">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 overflow-hidden">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="main-title">Shows We Recommend</h4>
                </div>
                <div id="suggestede-contens">
                  <div id="prev3" className="swiper-button swiper-button-prev">
                    <i className="fa fa-chevron-left"></i>
                  </div>
                  <div id="next3" className="swiper-button swiper-button-next">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={{
                      prevEl: "#prev3",
                      nextEl: "#next3",
                    }}
                    loop={true}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      550: { slidesPerView: 2 },
                      991: { slidesPerView: 3 },
                      1400: { slidesPerView: 4 },
                    }}
                    className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction"
                  >
                    {recommandedData.map((data) => (
                      <SwiperSlide className="slide-item">
                        <div className="block-images1 block-images position-relative">
                          <div className="img-box">
                            <img
                              src={data?.thumbnail?.banner_thumbnail_url}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="block-description">
                            <h6 className="iq-title">
                              <Link to="/movie-details">
                                {data?.media?.title}
                              </Link>
                            </h6>
                            <div className="movie-time d-flex align-items-center my-2">
                              <div className="badge badge-secondary p-1 mr-2">
                                15+
                              </div>
                              <span className="text-white">2 Seasons</span>
                            </div>
                            <div className="hover-buttons">
                              <Link
                                to="/movie-details"
                                role="button"
                                className="btn btn-hover"
                              >
                                <i
                                  className="fa fa-play mr-1"
                                  aria-hidden="true"
                                ></i>{" "}
                                Play Now
                              </Link>
                            </div>
                          </div>
                          <div className="block-social-info">
                            <ul className="list-inline p-0 m-0 music-play-lists">
                              <li className="share">
                                <span>
                                  <i className="ri-share-fill"></i>
                                </span>
                                <div className="share-box">
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="share-ico"
                                      tabIndex="0"
                                    >
                                      <i className="ri-facebook-fill"></i>
                                    </Link>
                                    <Link
                                      to="https://twitter.com/intent/tweet?text=Currentlyreading"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="share-ico"
                                      tabIndex="0"
                                    >
                                      <i className="ri-twitter-fill"></i>
                                    </Link>
                                    <Link
                                      to="#"
                                      data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                      className="share-ico iq-copy-link"
                                      tabIndex="0"
                                    >
                                      <i className="ri-links-fill"></i>
                                    </Link>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <span>
                                  <i className="ri-heart-fill"></i>
                                </span>
                                <span className="count-box">19+</span>
                              </li>
                              <li>
                                <span>
                                  <i className="ri-add-line"></i>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Video;
