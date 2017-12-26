import React, { Component } from 'react'
import Auxiliar from '../../hoc/Auxiliar';
import BurguerIngredient from '../../components/Burguer/BurguerIngredient/BurguerIngredient';

export default class BurguerBuilder extends Component {
    render() {
        return (
            <Auxiliar>
                <div>Burguer</div>
                <div>Build Controls</div>
                <BurguerIngredient type="meat"/>
            </Auxiliar>
        )
    }
}
