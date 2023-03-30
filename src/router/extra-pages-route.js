import { Switch, Route } from "react-router-dom";

import SignUp from "../views/backend/pages/auth/signup";
// import Login from "../views/backend/pages/auth/login";
import Loginsignup from "../views/backend/pages/auth/login_signup";

import RecoverPswd from "../views/backend/pages/auth/recover-pswd";

const ExtraPages = () => {
  return (
    <Switch>
      {/* <Route path="/extra-pages/sign-up" component={SignUp} /> */}
      {/* <Route path="/extra-pages/login" component={Login} /> */}
      <Route path="/extra-pages/recover-pswd" component={RecoverPswd} />
      <Route path="/extra-pages/login-signup" component={Loginsignup} />
    </Switch>
  );
};

export default ExtraPages;
