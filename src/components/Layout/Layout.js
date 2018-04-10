import React, { Component } from 'react'
import Auxiliar from '../../hoc/Auxiliar';
import classes from './Layout.css'
import Toolbar from "../UI/Toolbar/Toolbar";
import SideDrawer from "../UI/SideDrawer/SideDrawer";


class Layout extends Component {

    state = {
        showSD: false,
    }

    handleSideDrawer = () => {
        this.setState((prevState, props) => {
            return {
                showSD: !prevState.showSD,
            }
        })
    }

    render(){
        return (
            <Auxiliar>
                <Toolbar toggleMenu={this.handleSideDrawer}/>
                <SideDrawer hideSideDrawer={this.handleSideDrawer} open={this.state.showSD}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliar>
        )
    }
};

export default Layout;
