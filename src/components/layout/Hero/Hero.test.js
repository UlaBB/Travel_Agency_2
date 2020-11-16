

import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';

describe('Component Hero', () => {// describe sluzy do zgrupowania kilka testow w jednym ele., pierwszy ar. komponent Hero, drugi fun.strzalkowa z testami

    it('should render without crashing', () => {// funckja "it" definuje pojedynczy test
        const component = shallow(<Hero titleText='Lorem ipsum' imageSrc='hello' />);
        expect(component).toBeTruthy();// toBeTruthy- sprawdza czy komponent zwraca jakąs prawdziwą wartość
        console.log(component.debug());
    });

    it('should throw error without required props', () => {
        expect(() => shallow(<Hero />)).toThrow();
    });

    it('should render correct title and image', () => {
        const expectedTitle = 'Lorem ipsum';
        const expectedImage = 'image.jpg';
        const component = shallow(<Hero titleText={expectedTitle} imageSrc={expectedImage} />);

        const renderedTitle = component.find('.title').text();
        expect(renderedTitle).toEqual(expectedTitle);
        expect(component.find('.image').prop('src')).toEqual(expectedImage);
    });

    it('renders correct classNames', () => {
        const mockVariants = 'small dummy';
        const component = shallow(<Hero titleText='Lorem' imageSrc='image.jpg' variant={mockVariants} />);
        expect(component.hasClass('component')).toBe(true);
        expect(component.hasClass('small')).toBe(true);
        expect(component.hasClass('dummy')).toBe(true);
    });
});