import React from 'react';
import classes from './NavigationItems.css';
import NavItem from "../NavItem/NavItem";

const NavigationItems = ({ isAuth }) => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/">Burger Builder</NavItem>
        {isAuth ? <NavItem link="/orders">Orders</NavItem> : null }
        {
            !isAuth ?
                <NavItem link="/auth">Auth</NavItem> :
                <NavItem link="/logout">Logout</NavItem>
        }
    </ul>
);

export default NavigationItems;