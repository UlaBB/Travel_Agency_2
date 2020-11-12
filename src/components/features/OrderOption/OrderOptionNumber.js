import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import { formatPrice } from './../../../utils/formatPrice';

const OrderOptionNumber = ({ currentValue, limits, setOptionValue, price }) => {
    return (
        <div className={styles.number}>
            <input
                type='number'
                className={styles.inputSmall}
                value={currentValue}
                min={limits.min}
                max={limits.max}
                onChange={event => setOptionValue(event.currentTarget.value)}
            >
            </input>
            {formatPrice(price)}
        </div>
    );
};

OrderOptionNumber.propTypes = {
    currentValue: PropTypes.number,
    setOptionValue: PropTypes.func,
    limits: PropTypes.object,
    price: PropTypes.node,
};

export default OrderOptionNumber;