import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxiliar from "./hoc/Auxiliar";
import {Route, Switch} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";

class App extends Component {
  render() {
    return (
      <Auxiliar>
        <Layout>
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/" component={BurgerBuilder} />
            </Switch>
        </Layout>
      </Auxiliar>
    );
  }
}

export default App;
