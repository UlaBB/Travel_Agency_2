import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from '../TripSummary/TripSummary';

describe('Component TripSummary', () => {
    // if generated link is ok for adres /trip/abc
    it('generate correct link', () => {
        const expectedLink = '/trip/abc';
        const component = shallow(<TripSummary id='abc' image='' name='' cost='' days={1} tags={['tag1', 'tag2']} />);
        expect(component.find('.link').prop('to')).toEqual(expectedLink);
    });

    // if <img> has proper Alt and src
    it('has correct img and alt', () => {
        const expectedImage = 'image.jpg';
        const expectedAlt = 'alternative';
        const component = shallow(<TripSummary id='' image={expectedImage} name={expectedAlt} cost='' days={1} tags={['tag1', 'tag2']} />);
        const renderedImage = component.find('img');
        expect(renderedImage.prop('src')).toEqual(expectedImage);
    });

    // proper render of props : name, cost,days
    it('has correct props of days, cost, name', () => {
        const expectedDays = 2;
        const expectedCost = '1500';
        const expectedName = 'Turkey';

        const component = shallow(<TripSummary id='' image='' name={expectedName} cost={expectedCost} days={expectedDays} tags={['tag1', 'tag2']} />);

        expect(component.find('.title').text()).toEqual(expectedName);
        expect(component.find('.details').text()).toEqual(`${expectedDays} daysfrom ${expectedCost}`);
    });

    // if ther is error if ther won't be some of the props
    it('error without correct props', () => {
        expect(() => shallow(<TripSummary />)).toThrow();
    });


    it('renders tags in spans in the correct order', () => {
        const expectedTags = ['tag1', 'tag2', 'tag3'];
        const component = shallow(<TripSummary id='' image='' name='name' cost='cost' days={1} tags={expectedTags} />);

        expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
        expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
        expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
    });


    it('should not render div with tag class if tags prop is not given', () => {
        const expectedTags = [];

        const component = shallow(<TripSummary tags={expectedTags} id='' image='' name='' cost='' days={1} />);

        expect(component.find('tags div').exists(expectedTags)).toBe(false);
        //console.log(component.debug());
    });

});