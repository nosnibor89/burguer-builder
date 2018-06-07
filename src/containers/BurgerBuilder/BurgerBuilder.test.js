import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>',() => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder />, { disableLifecycleMethods: true});
    });

    it('should display build controls if it receives ingredients', () => {
        wrapper.setProps({ ingredients: { salad: 1 , cheese: 1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});