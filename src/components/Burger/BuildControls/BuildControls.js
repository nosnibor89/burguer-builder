import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

var controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price}</strong></p>
            {controls.map(control => <BuildControl
                onLessClick={() => props.onIngredientRemove(control.type)}
                onMoreClick={() => props.onIngredientAdd(control.type)}
                disabled={props.disabledControls[control.type]}
                key={control.label} 
                label={control.label}/>)}
             <button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.onToggleBurgerOrder}>Order now</button>
        </div>
    )
}

export default BuildControls;
