import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as authAction from "../../../store/actions";

const Logout = props => {
  useEffect(() => {
    props.logout();
  });

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authAction.logOut())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
