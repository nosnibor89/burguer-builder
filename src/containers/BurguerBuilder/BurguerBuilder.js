import React, { Component } from 'react'
import Auxiliar from '../../hoc/Auxiliar';
import Burguer from '../../components/Burguer/Burguer';

export default class BurguerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }


    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        }
    }

    render() {
        return (
            <Auxiliar>
                <Burguer ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Auxiliar>
        )
    }
}
