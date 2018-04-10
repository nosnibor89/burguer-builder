import React from "react";
import Logo from "../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.css';
import Backdrop from "../Backdrop/Backdrop";
import Auxiliar from "../../../hoc/Auxiliar";


const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
        <Auxiliar>
            <Backdrop show={props.open} onHide={props.hideSideDrawer}/>
            <div className={attachedClasses.join(' ')}>
                <div style={{height: '20%', margin: '10px 0'}}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Auxiliar>
    );
};
export default SideDrawer;