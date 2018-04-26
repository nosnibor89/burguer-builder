import React from "react";
import PropTypes from 'prop-types';

import classes from './Input.css';

const inputTypes = {
    textarea: 'textarea',
    input: 'input',
    select: 'select'
};

// const Input = (props) => {
//     let inputElement = null;
//     let label = null;
//
//     if(props.label){
//         label = <label>{props.label}</label>;
//     }
//
//     switch (props.inputtype){
//         case  inputTypes.input:
//             inputElement = <input className={classes.InputElement} {...props} />
//             break;
//         case  inputTypes.textarea:
//             inputElement = <textarea className={classes.InputElement} {...props}/>
//             break;
//         default:
//             inputElement = <input className={classes.InputElement} {...props} />
//             break;
//     }
//
//     return (
//         <div className={classes.Input}>
//             {label}
//             {inputElement}
//         </div>
//     )
// };

const Input = ({elementType, elementConfig, value}) => {
    let inputElement = null;
    let label = null;

    if(elementConfig.label){
        label = <label>{elementConfig.label}</label>;
    }

    switch (elementType){
        case  inputTypes.input:
            inputElement = <input className={classes.InputElement} {...elementConfig}  value={value}/>
            break;
        case  inputTypes.textarea:
            inputElement = <textarea className={classes.InputElement} {...elementConfig} value={value}/>
            break;
        case  inputTypes.select:
            inputElement = <textarea className={classes.InputElement} {...elementConfig} value={value}/>
            break;
        default:
            inputElement = <input className={classes.InputElement} {...elementConfig}  value={value}/>
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
    elementType: PropTypes.oneOf([inputTypes.textarea, inputTypes.input, inputTypes.select]),
    elementConfig:       PropTypes.object.isRequired,
};

export default Input; 