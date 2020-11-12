import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import { formatPrice } from './../../../utils/formatPrice';
import Icon from './../../common/Icon/Icon';

const OrderOptionIcons = ({ values, setOptionValue, currentValue, required }) => (
    <div className={styles.dropdown}>

        {required ? '' : (
            <div value={currentValue}
                className={styles.icon}
                onChange={() => setOptionValue('')}>
                <Icon name={'times-circle'} />
            </div>
        )}

        {values.map(value => (
            <div
                key={value.id}
                className={currentValue === value.id ? styles.iconActive : styles.icon}
                onClick={() => setOptionValue(value.id)}
            >
                <Icon name={value.icon} />
                {value.name}
                {formatPrice(value.price)}
            </div>
        ))}
    </div>
);

OrderOptionIcons.propTypes = {
    values: PropTypes.array,
    required: PropTypes.bool,
    currentValue: PropTypes.string,
    setOptionValue: PropTypes.func,
};

export default OrderOptionIcons;