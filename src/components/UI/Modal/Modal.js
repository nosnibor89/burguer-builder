
import React, { Component } from 'react';
import classes from './Modal.css';
import Auxiliar from "../../../hoc/Auxiliar";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Auxiliar>
                <Backdrop show={this.props.show} onHide={this.props.onHideModal}></Backdrop>
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Auxiliar>
        );
    }
};


export default Modal;