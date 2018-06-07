import React from 'react';
import classes from './NavigationItems.css';
import NavItem from "../NavItem/NavItem";

const NavigationItems = ({ isAuth, onHide }) => (
    <ul className={classes.NavigationItems}>
        <NavItem onHide={onHide} link="/">Burger Builder</NavItem>
        {isAuth ? <NavItem onHide={onHide} link="/orders">Orders</NavItem> : null }
        {
            !isAuth ?
                <NavItem onHide={onHide} link="/auth">Auth</NavItem> :
                <NavItem onHide={onHide}  link="/logout">Logout</NavItem>
        }
    </ul>
);

export default NavigationItems;