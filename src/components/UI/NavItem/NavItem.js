import React from 'react';
import classes from './NavItem.css';
import {NavLink} from "react-router-dom";

const NavigationItem = (props) => (
    <li className={classes.NavItem}>
        <NavLink onClick={props.onHide} to={props.link} exact activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default NavigationItem;