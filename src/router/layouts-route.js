import { Switch, Route } from "react-router-dom";
import Layout1 from "../layouts/backend/layout1";
import BlankLayout from "../layouts/blanklayout";
import Login from "../views/backend/pages/auth/login";
import PrivateRoute from "./PrivateRoute";

const LayoutsRoute = (props) => {
  return (
    <Switch>
      <Route path="/extra-pages" component={BlankLayout} />
      {/* <Route path="/" component={Layout1} /> */}
      {/* <Route path="/home" component={Layout1} /> */}
      <PrivateRoute path="/home" component={Layout1} />
      <Route path="/" component={Login} />
    </Switch>
  );
};

export default LayoutsRoute;
