import { Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from "./PrivateRoute";
import UserAccountSettingList from "../views/backend/app/usermanagement/useraccountsetting";
// Home
import Homepage from "../views/backend/home/home";
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
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Layout1Route;
