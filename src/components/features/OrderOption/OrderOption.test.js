import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption.js';


describe('Component OrderOption', () => {

    it('should render without crashin', () => {
        const component = shallow(<OrderOption id='id' name='name' currentValue='currentValue' type='type' values={['value', 'value1']} />);
        expect(component).toBeTruthy();
    });


    it('should return empty object if called without required props', () => {
        const component = shallow(<OrderOption />);
        expect(component).toEqual({});
    });

    it('should render title name', () => {
        const expectedName = 'name';
        const component = shallow(<OrderOption id='id' name={expectedName} type='date' currentValue='current value' values={['value', 'value1']} />);

        expect(component.find('.title').text()).toEqual(expectedName);
    });
});

const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
};

const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
        { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
        { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
        min: 0,
        max: 6,
    },
};

const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: { currentValue: [mockProps.currentValue] },
    number: { currentValue: 1 },
    text: {},
    date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for (let type in optionTypes) {
    describe(`Component OrderOption with type=${type}`, () => {
        /* test setup */
        let component;
        let renderedSubcomponent;
        let mockSetOrderOption; /* 1 */

        beforeEach(() => {
            mockSetOrderOption = jest.fn(); /* 2 */
            component = shallow(
                <OrderOption
                    type={type}
                    setOrderOption={mockSetOrderOption} /* 3 */
                    {...mockProps}
                    {...mockPropsForType[type]}
                />
            );

            /* common tests */

            it(`renders ${optionTypes[type]}`, () => {
                expect(subcomponent).toBeTruthy();
                expect(subcomponent.length).toBe(1);
            });

            /* type-specific tests */
            switch (type) {
                case 'dropdown': {
                    /* tests for dropdown */
                    it('contains select and options', () => {
                        const select = renderedSubcomponent.find('select');
                        expect(select.length).toBe(1);

                        const emptyOption = select.find('option[value=""]').length;
                        expect(emptyOption).toBe(1);

                        const options = select.find('option').not('[value=""]');
                        expect(options.length).toBe(mockProps.values.length);
                        expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
                        expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
                    });

                    it('should run setOrderOption function on change', () => {
                        renderedSubcomponent.find('select').simulate('change', { currentTarget: { value: testValue } });
                        expect(mockSetOrderOption).toBeCalledTimes(1);
                        expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
                    });
                    break;
                }
                case 'icons': {
                    /* tests for icons */
                    it('contains icon components', () => {
                        const icons = renderedSubcomponent.find('Icon');
                        expect(icons.length).toBe(mockProps.values.length);
                        const iconName = renderedSubcomponent.find('Icon').at(1).prop('name');
                        expect(iconName).toEqual(mockProps.values[0].icon);
                        renderedSubcomponent.find('.icon > div').last().simulate('click');
                        expect(mockSetOrderOption).toBeCalledTimes(1);
                        expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
                    });
                    break;
                }


                case 'checkboxes': {
                    /* tests for checkboxes */
                    it('contains checkboxes', () => {
                        const checkboxes = renderedSubcomponent.find('input');
                        expect(checkboxes.length).toBe(mockProps.values.length);
                        expect(checkboxes.at(0).prop('type')).toBe('checkbox');
                        expect(checkboxes.at(1).prop('type')).toBe('checkbox');
                    });

                    it('should run setOrderOption function on change', () => {
                        renderedSubcomponent.find('input').at(1).simulate('change', { currentTarget: { checked: true } });
                        expect(mockSetOrderOption).toBeCalledTimes(1);
                        expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
                    });

                    break;
                }

                case 'number': {
                    /* tests for number */
                    it('has input and reacts onChange', () => {
                        const input = renderedSubcomponent.find('input');
                        expect(input.length).toBe(1);
                        input.simulate('change', { currentTarget: { value: testValueNumber } });
                        expect(mockSetOrderOption).toBeCalledTimes(1);
                        expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });

                        const limitMin = renderedSubcomponent.find('input').prop('min');
                        const limitMax = renderedSubcomponent.find('input').prop('max');
                        expect(limitMin).toEqual(mockProps.limits.min);
                        expect(limitMax).toEqual(mockProps.limits.max);

                    });
                    break;
                }
                case 'text': {
                    /* tests for text */
                    it('has input and reacts onChange', () => {
                        const input = renderedSubcomponent.find('input');
                        expect(input.length).toBe(1);

                        const valueProp = renderedSubcomponent.find('input').prop('value');
                        expect(valueProp).toEqual(mockProps.currentValue);

                        input.simulate('change', { currentTarget: { value: testValue } });
                        expect(mockSetOrderOption).toBeCalledTimes(1);
                        expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });

                    });
                    break;
                }
                case 'date': {
                    /* tests for date */
                    it('contains select and options', () => {
                        const datePicker = renderedSubcomponent.find(DatePicker);
                        expect(datePicker.length).toBe(1);

                        datePicker.simulate('select', testValue);
                        expect(mockSetOrderOption).toBeCalledTimes(1);
                        expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });

                    });
                    break;
                }
            }

        });
    });
}
