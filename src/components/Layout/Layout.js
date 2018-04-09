import React from 'react'
import Auxiliar from '../../hoc/Auxiliar';
import classes from './Layout.css'
import Toolbar from "../UI/Toolbar/Toolbar";
import SideDrawer from "../UI/SideDrawer/SideDrawer";


const Layout = (props) => (
    <Auxiliar>
        <Toolbar/>
        <SideDrawer/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxiliar>
);

export default Layout;
