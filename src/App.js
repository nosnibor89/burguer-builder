import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxiliar from "./hoc/Auxiliar";

class App extends Component {
  render() {
    return (
      <Auxiliar>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </Auxiliar>
    );
  }
}

export default App;
