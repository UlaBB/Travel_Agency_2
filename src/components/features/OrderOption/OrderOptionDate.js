import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({ setOptionValue }) => {

    const [startDate, setStartDate] = useState(new Date());

    return (
        <DatePicker
            selected={startDate}
            onChange={date => {
                setStartDate(date);
                setOptionValue(date);
            }}
            minDate={new Date()}
        />
    );
};

OrderOptionDate.propTypes = {
    setOptionValue: PropTypes.func,
};

export default OrderOptionDate;