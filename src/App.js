import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxiliar from "./hoc/Auxiliar";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";
import AsyncComponent from "./hoc/AsyncComponent";

const AsyncCheckout = AsyncComponent(() => import('./containers/Checkout/Checkout'));

const AsyncOrders = AsyncComponent(() => import('./containers/Orders/Orders'));

const AsyncAuth = AsyncComponent(() => import('./containers/Auth/Auth.js'));

class App extends Component {

    componentDidMount(){
        this.props.autoSignUp();
    }

  render() {
     let routes = (
         <Switch>
             <Route path="/auth" component={AsyncAuth} />
             <Route path="/" component={BurgerBuilder} />
             <Redirect to="/"/>
         </Switch>
     );

     if(this.props.isAuthenticated){
         routes = (
             <Switch>
                 <Route path="/checkout" component={AsyncCheckout} />
                 <Route path="/orders" component={AsyncOrders} />
                 <Route path="/auth" component={AsyncAuth} />
                 <Route path="/logout" component={Logout} />
                 <Route path="/" component={BurgerBuilder} />
             </Switch>
         );
     }

    return (
      <Auxiliar>
        <Layout>
            {routes}
        </Layout>
      </Auxiliar>
    );
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
    autoSignUp: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
