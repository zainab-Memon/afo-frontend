import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import FsLightbox from "fslightbox-react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";

//images
import trending from "../../../assets/images/trending/trending-label.png";
import movie1 from "../../../assets/images/movies/06.jpg";
import movie2 from "../../../assets/images/movies/07.jpg";
import movie3 from "../../../assets/images/movies/08.jpg";
import movie4 from "../../../assets/images/movies/09.jpg";
import movie5 from "../../../assets/images/movies/10.jpg";
import upcoming1 from "../../../assets/images/upcoming/01.jpg";
import upcoming2 from "../../../assets/images/upcoming/02.jpg";
import upcoming3 from "../../../assets/images/upcoming/03.jpg";
import upcoming4 from "../../../assets/images/upcoming/04.jpg";
import upcoming5 from "../../../assets/images/upcoming/05.jpg";
import video from "../../../assets/video/sample-video.mp4";
import getGeneralContent from "../../../Services/generalContent";
import { MainSliderApi } from "../../../Services/allSliders";
import Comments from "../../../components/Comments";
import AddComment from "../../../components/AddComment";
import { SuggestedApi, UpComingSliderApi } from "../../../Services/SliderApi";
// install Swiper modules
SwiperCore.use([Navigation]);

const AddMovie = () => {
  //   const [mediaId, setMediaId] = useState("");
  const [content, setContent] = useState({});
  const [playerId, setPlayerId] = useState("");
  const [toggler1, setToggler1] = useState(false);
  const [activeBtn, setActiveBtn] = useState("description");
  const [loader, setLoader] = useState(true);
  const [mainSliderData, setMainSliderData] = useState({});
  const [upcomingData, setUpcomingData] = useState([]);
  const [suggestedData, setSuggestedData] = useState([]);
  const { id } = useParams();
  // console.log(id);
  // console.log(activeBtn);

  const handleClick = (btnText) => {
    setActiveBtn(btnText);
  };

  useEffect(() => {
    UpComingSliderApi()
      .then((data) => {
        setUpcomingData(data.upcomingContent);
      })
      .catch((error) => {
        console.log(error, "Upcoming Slider error");
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

  // useEffect(() => {
  //   MainSliderApi()
  //     .then((data) => {
  //       setMainSliderData(data.allSliders);
  //       // console.log("slider data", mainSliderData);
  //     })
  //     .catch((error) => {
  //       console.log(error, "Main Slider error");
  //     });
  // }, []);

  // const ids = mainSliderData
  //   .map((obj) =>
  //     obj.general_content.media._id ? obj.general_content.media._id : null
  //   )
  //   .filter((_id) => _id !== null);
  // console.log("ids", ids);

  useEffect(() => {
    getGeneralContent({ id })
      .then((data) => {
        setContent(data);
        setLoader(false);
        console.log("content", content);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log("data::", content);
  const mediaId = content?.generalContentObj?.media?.media_id;
  const trailerId = content?.generalContentObj?.trailer?.media_id;
  const bannerImg = content?.generalContentObj?.thumbnail?.banner_thumbnail_url;
  const movieTitle = content?.generalContentObj?.media?.title;
  // console.log(loader);
  // console.log("mediaId:", mediaId);
  // console.log("trailerId:", trailerId);

  useEffect(() => {
    const monetizationCheck = content?.generalContentObj?.media?.monetization;
    if (monetizationCheck) {
      setPlayerId("4t00MwmP");
    } else {
      setPlayerId("4t00MwmP");
    }
  }, [content]);

  return (
    <>
      <FsLightbox
        toggler={toggler1}
        sources={[
          <iframe
            src={`https://cdn.jwplayer.com/players/${trailerId}-${playerId}.html`}
            title=" "
            width="500px"
            height="200px"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />,
        ]}
      />

      <section className="relative">
        {loader && (
          <div className="loader">
            <div className="outer"></div>
            <div className="middle"></div>
            <div className="inner"></div>
          </div>
        )}
        {!loader && (
          <>
            <div className="container-video">
              <iframe
                className="responsive-iframe"
                src={`https://cdn.jwplayer.com/players/${mediaId}-${playerId}.html`}
                allowFullScreen
                width="100%"
                height="100%"
              ></iframe>
              {/* <iframe
          src="https://cdn.jwplayer.com/players/TLBj22gZ-4t00MwmP.html"
          width="100%"
          height="100%"
          scrolling="auto"
          title="Talha bhai testing 2 Trailer"
          style={{ position: "absolute" }}
          allowFullScreen
        ></iframe> */}
              {/* <video className="video d-block" controls loop>
          <source src={video} />
        </video> */}
              {/* <JWPlayer playerId="myplayer" playerOptions={jwplayerOptions} /> */}
              {/* <ReactPlayer url="https://cdn.jwplayer.com/videos/8L4m9FJB-TNpruJId.mp4" /> */}
            </div>
            <div className="main-content movi">
              <section className="movie-detail container-fluid">
                <Row>
                  <Col lg="12">
                    <div className="trending-info g-border">
                      <div className="d-flex justify-content-between movie-info-container">
                        <div>
                          <h1 className="trending-text big-title text-uppercase mt-0">
                            {movieTitle}
                          </h1>
                          <ul className="p-0 list-inline d-flex movie-content">
                            <li className="text-white">Action</li>
                            <li className="text-white">Drama</li>
                            <li className="text-white">Thriller</li>
                          </ul>
                          <div className="d-flex align-items-center text-white text-detail">
                            <span className="">3h: 15mis</span>
                            <span className="trending-year">Nov 2023</span>
                          </div>
                          <ul className="list-inline p-0 mt-4 share-icons music-play-lists">
                            <li className="share">
                              <span>
                                <i className="ri-add-line"></i>
                              </span>
                              <div className="favorite-box">
                                <div className="">Add to wishlist</div>
                              </div>
                            </li>

                            <li className="share">
                              <span>
                                <i className="ri-heart-fill"></i>
                              </span>
                              <div className="favorite-box">
                                <div className="">Add to favorites</div>
                              </div>
                            </li>
                            <li className="share">
                              <span>
                                <i className="ri-share-fill"></i>
                              </span>
                              <div className="share-box">
                                <div className="d-flex align-items-center">
                                  <Link to="#" className="share-ico">
                                    <i className="ri-facebook-fill"></i>
                                  </Link>
                                  <Link to="#" className="share-ico">
                                    <i className="ri-twitter-fill"></i>
                                  </Link>
                                  <Link to="#" className="share-ico">
                                    <i className="ri-links-fill"></i>
                                  </Link>
                                </div>
                              </div>
                            </li>

                            <li className="share">
                              <span>
                                <i className="ri-thumb-up-fill"></i>
                              </span>
                              <div className="favorite-box">
                                <div className="">Like</div>
                              </div>
                            </li>
                          </ul>
                          <div className="d-flex movie-tags mb-4">
                            <div>
                              <i className="ri-price-tag-3-fill"></i>
                              Tags:
                            </div>
                            <div className="d-flex movie-tags-tag">
                              <span>Horror,</span>
                              <span>Thriller,</span>
                              <span>Crime</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            className="trailer-container"
                            onClick={() => setToggler1(!toggler1)}
                          >
                            <img
                              src={bannerImg}
                              alt="Background"
                              className="trailer-image"
                            />
                            <div className="trailer-overlay"></div>
                            <div className="trailer-text">Watch trailer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </section>
              <section>
                <div className="movie-desc-navigator">
                  <button
                    className={` ${
                      activeBtn === "description"
                        ? "movie-desc-navigator__active-btn movie-desc-navigator-btn "
                        : "movie-desc-navigator-btn"
                    }`}
                    onClick={() => handleClick("description")}
                  >
                    Description
                  </button>
                  <button
                    className={` ${
                      activeBtn === "review"
                        ? "movie-desc-navigator__active-btn movie-desc-navigator-btn"
                        : "movie-desc-navigator-btn"
                    }`}
                    onClick={() => handleClick("review")}
                  >
                    Rate and Review
                  </button>
                </div>
              </section>
              <section>
                {activeBtn === "description" && (
                  <section className="container-fluid">
                    <Row className=" fs-5 mt-5">
                      <Col lg="12" md="12" className="overflow-hidden">
                        <span className="movie-desc-navigator__desc-text ">
                          The Dinosaurs are a diverse group of reptiles of the
                          clade Dinosauria. They first appeared during the
                          Triassic period, between 243 and 233.23 million years
                          ago, although the exact origin and timing of the
                          evolution of dinosaurs is the subject of active
                          research.
                        </span>
                        <h4 className="mt-4 mb-4 movie-desc-crew-heading">
                          Crew Members
                        </h4>
                        <Row>
                          <Col xs={3}>
                            <div className="movie-desc-crew">
                              <div className="movie-desc-crew-title">
                                <span>Direcor</span>
                                <span>John Wick</span>
                              </div>
                              <div className="movie-desc-crew-title">
                                <span>Actor</span>
                                <span>Lionel Messi</span>
                              </div>
                              <div className="movie-desc-crew-title">
                                <span>Co-Actor</span>
                                <span>Cristiano Ronaldo</span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </section>
                )}
                {activeBtn === "review" && (
                  <section className="mt-5 mb-5 container-fluid">
                    <h4 className="mb-2 comments-heading">Comments:</h4>

                    <Comments generalContentId={id} />
                    <AddComment generalContentId={id} />
                  </section>
                )}
                {/* {activeBtn === "sources" && (
            <section className="intro">
              <div
                className="bg-image h-100"
                // style={{
                //   backgroundImage: url(
                //     https://mdbootstrap.com/img/Photos/new-templates/tables/img2.jpg"
                //   ),
                // }}
              >
                <div
                  className="mask d-flex align-items-center h-100"
                  // style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="container w-100">
                    <div className="row justify-content-center ">
                      <div className="col-12 ">
                        <div className="card shadow-2-strong movie-desc-navigator__table">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead>
                                  <tr>
                                    <th scope="col">Links</th>
                                    <th scope="col">Quality</th>
                                    <th scope="col">Language</th>
                                    <th scope="col">Player</th>
                                    <th scope="col">Date Added</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <button>Play now</button>
                                    <td>1080p</td>
                                    <td>English </td>
                                    <td>MusicBee</td>
                                    <td>2021-12-04</td>
                                  </tr>
                                  <tr>
                                    <button>Play now</button>
                                    <td>1080p</td>
                                    <td>sEnglish</td>
                                    <td>MusicBee</td>
                                    <td>2021-12-04</td>
                                  </tr>
                                  <tr>
                                    <button>Play now</button>
                                    <td>1080p</td>
                                    <td>English </td>
                                    <td>MusicBee</td>
                                    <td>2021-12-04</td>
                                  </tr>
                                  <tr>
                                    <button>Play now</button>
                                    <td>1080p</td>
                                    <td>English </td>
                                    <td>MusicBee</td>
                                    <td>2021-12-04</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )} */}
              </section>
              <section id="iq-favorites" className="s-margin iq-rtl-direction">
                <Container fluid>
                  <Row>
                    <Col sm="12" className="overflow-hidden">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 className="main-title">
                          <Link to="#">More Like This</Link>
                        </h4>
                      </div>
                      <div id="favorites-contens">
                        <div
                          id="prev1"
                          className="swiper-button swiper-button-prev"
                        >
                          <i className="fa fa-chevron-left"></i>
                        </div>
                        <div
                          id="next1"
                          className="swiper-button swiper-button-next"
                        >
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
                          className="list-inline favorites-slider row p-0 m-0"
                        >
                          {suggestedData.map((data) => (
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
                                    <Link to="#">{data?.media?.title}</Link>
                                  </h6>
                                  <div className="movie-time d-flex align-items-center my-2">
                                    <div className="badge badge-secondary p-1 mr-2">
                                      20+
                                    </div>
                                    <span className="text-white">
                                      {data?.media?.duration}
                                    </span>
                                  </div>
                                  <div className="hover-buttons">
                                    <span className="btn btn-hover">
                                      <i
                                        className="fa fa-play mr-1"
                                        aria-hidden="true"
                                      ></i>
                                      Play Now
                                    </span>
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
              <section id="iq-upcoming-movie" className="iq-rtl-direction">
                <Container fluid>
                  <Row>
                    <Col sm="12" className="overflow-hidden">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 className="main-title">
                          <Link to="#">Upcoming Movies</Link>
                        </h4>
                      </div>
                      <div id="upcoming-contens">
                        <div
                          id="prev2"
                          className="swiper-button swiper-button-prev"
                        >
                          <i className="fa fa-chevron-left"></i>
                        </div>
                        <div
                          id="next2"
                          className="swiper-button swiper-button-next"
                        >
                          <i className="fa fa-chevron-right"></i>
                        </div>
                        <Swiper
                          slidesPerView={4}
                          spaceBetween={20}
                          navigation={{
                            prevEl: "#prev2",
                            nextEl: "#next2",
                          }}
                          loop={true}
                          breakpoints={{
                            320: { slidesPerView: 1 },
                            550: { slidesPerView: 2 },
                            991: { slidesPerView: 3 },
                            1400: { slidesPerView: 4 },
                          }}
                          className="favorites-slider list-inline  row p-0 m-0"
                        >
                          {upcomingData.map((data) => (
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
                                    <Link to="#">{data?.media?.title}</Link>
                                  </h6>
                                  <div className="movie-time d-flex align-items-center my-2">
                                    <div className="badge badge-secondary p-1 mr-2">
                                      5+
                                    </div>
                                    <span className="text-white">
                                      {data?.media?.duration}
                                    </span>
                                  </div>
                                  <div className="hover-buttons">
                                    <span className="btn btn-hover">
                                      <i
                                        className="fa fa-play mr-1"
                                        aria-hidden="true"
                                      ></i>
                                      Play Now
                                    </span>
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
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default AddMovie;
