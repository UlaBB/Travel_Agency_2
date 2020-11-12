import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OrderOptionDate';

const optionTypes = {
    dropdown: OrderOptionDropdown,
    checkboxes: OrderOptionCheckboxes,
    icons: OrderOptionIcons,
    number: OrderOptionNumber,
    text: OrderOptionText,
    date: OrderOptionDate,
};

const OrderOption = ({ name, type, id, setOrderOption, ...otherProps }) => {
    const OptionComponent = optionTypes[type];
    if (!OptionComponent) {
        return null;
    } else {
        return (
            <div className={styles.component} >
                <h3 className={styles.title}>{name}</h3>
                <OptionComponent
                    setOptionValue={value => setOrderOption({ [id]: value })}
                    {...otherProps} />
            </div>
        );
    }
};

OrderOption.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    setOrderOption: PropTypes.any,
};

export default OrderOption;