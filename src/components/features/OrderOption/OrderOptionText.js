import React from 'react';
import PropTypes from 'prop-types';

const OrderOptionText = ({ setOptionValue, currentValue }) => {
    return (
        <div>
            <input
                type='text'
                value={currentValue}
                onChange={event => setOptionValue(event.currentTarget.value)}
            >
            </input>
        </div>
    );
};

OrderOptionText.propTypes = {
    setOptionValue: PropTypes.func,
    currentValue: PropTypes.string,
};

export default OrderOptionText;