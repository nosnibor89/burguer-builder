import React, { useState } from "react";
import { connect } from "react-redux";

import Auxiliar from "../../hoc/Auxiliar";
import classes from "./Layout.css";
import Toolbar from "../UI/Toolbar/Toolbar";
import SideDrawer from "../UI/SideDrawer/SideDrawer";

const Layout = ({ isAuthenticated, children }) => {
  const [showSD, setShowSD] = useState(false);

  const handleSideDrawer = () => {
    setShowSD(!showSD);
  };

  return (
    <Auxiliar>
      <Toolbar isAuth={isAuthenticated} toggleMenu={handleSideDrawer} />
      <SideDrawer
        isAuth={isAuthenticated}
        hideSideDrawer={handleSideDrawer}
        open={showSD}
      />
      <main className={classes.Content}>{children}</main>
    </Auxiliar>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
