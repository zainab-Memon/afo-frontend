import { Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import UserAccountSettingList from "../views/backend/app/usermanagement/useraccountsetting";

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
          <Route path="/setting" component={UserAccountSettingList} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Layout1Route;
