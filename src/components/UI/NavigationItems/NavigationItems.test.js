import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from "./NavigationItems";
import NavItem from "../NavItem/NavItem";

configure({adapter: new Adapter()});

describe('<NavigationItems/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two navigation <NavItem/> elements  if not authenticated', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render three navigation <NavItem/> elements  if authenticated', () => {
        wrapper.setProps({ isAuth: true});
        expect(wrapper.find(NavItem)).toHaveLength(3);

    });

    it('should render three navigation <NavItem/> elements log if authenticated', () => {
        wrapper.setProps({ isAuth: true});
        expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toBe(true);

    });



});