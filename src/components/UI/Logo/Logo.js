import React from 'react';
import burgerLogo from '../../../assests/images/burger-logo.png';
import classes from './Logo.css';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="burger"/>
    </div>
);


export default Logo;