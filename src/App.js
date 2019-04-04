import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auxiliar from "./hoc/Auxiliar";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";

const Checkout = React.lazy(() =>
  import("./containers/Checkout/Checkout")
);

const Orders = React.lazy(() => import("./containers/Orders/Orders"));

const Auth = React.lazy(() => import("./containers/Auth/Auth.js"));

const App = ({ isAuthenticated, autoSignUp }) => {
  useEffect(() => {
    autoSignUp();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" component={() => <Auth />} />
      <Route path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={() => <Checkout />} />
        <Route path="/orders" component={() => <Orders/>} />
        <Route path="/auth" component={() => <Auth />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
  }

  return (
    <Auxiliar>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
        {routes}
        </Suspense>
      </Layout>
    </Auxiliar>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  autoSignUp: () => dispatch(actions.authCheckState())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
