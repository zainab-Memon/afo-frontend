import { Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from "./PrivateRoute";
import UserAccountSettingList from "../views/backend/app/usermanagement/useraccountsetting";
// Home
import Homepage from "../views/backend/home/home";
// extra
import FAQ from "../views/backend/pages/faq";
import TermsOfUse from "../views/backend/pages/extrapages/termsOfUse";
import PrivacyPolicy from "../views/backend/pages/extrapages/privacyPolicy";
import AboutUs from "../views/backend/pages/about-us";
import Contact from "../views/backend/pages/contact";
//Movie
import AddMovie from "../views/backend/movie/add-movie";
import MovieList from "../views/backend/movie/movie-list";
//Show
import ShowList from "../views/backend/show/show-list";

const Layout1Route = () => {
  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        // key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Switch location={location}>
          {/* <PrivateRoute
            path="/home/setting"
            component={UserAccountSettingList}
          /> */}
          <Route path="/profile/setting" component={UserAccountSettingList} />
          {/* homepage */}
          <Route path="/" exact component={Homepage} />
          <Route path="/faq" component={FAQ} />
          <Route path="/terms-of-service" component={TermsOfUse} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact" component={Contact} />
          <Route path="/movie-details" component={AddMovie} />
          <Route path="/movie-category" component={MovieList} />
          <Route path="/show-details" component={ShowList} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Layout1Route;
