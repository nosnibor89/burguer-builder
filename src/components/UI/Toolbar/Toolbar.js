import React from 'react';
import classes from './Toolbar.css';
import Logo from "../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BurgerButton from "../BurgerButton/BurgerButton";

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <BurgerButton toggle={props.toggleMenu}/>
        <div style={{height: '90%'}}>
            <Logo/>
        </div>

        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default Toolbar;