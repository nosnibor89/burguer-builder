import React from "react";
import PropTypes from 'prop-types';

import classes from './Input.css';

const inputTypes = {
    textarea: 'textarea',
    input: 'input',
};

const Input = (props) => {
    let inputElement = null;
    let label = null;

    if(props.label){
        label = <label>{props.label}</label>;
    }

    switch (props.inputtype){
        case  inputTypes.input:
            inputElement = <input className={classes.InputElement} {...props} />
            break;
        case  inputTypes.textarea:
            inputElement = <textarea className={classes.InputElement} {...props}/>
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props} />
            break;
    }

    return (
        <div className={classes.Input}>
            {label}
            {inputElement}
        </div>
    )
};

Input.propTypes = {
    inputType: PropTypes.oneOf([inputTypes.textarea, inputTypes.input]),
}

export default Input; 