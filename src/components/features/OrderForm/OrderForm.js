import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderFrom.scss';
import { Grid, Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pircing from './../../../data/pricing.json';
import OrderOption from './../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../data/settings';


const sendOrder = (options, tripCost, tripName, tripId, tripCode) => {
    const totalCost = formatPrice(calculateTotal(tripCost, options));

    const { contact, name } = options;


    if (name === '' || name.lenght < 3) {
        alert('Please, write name form');
        return;
    }

    if (contact === '' || contact.lenght < 6) {
        alert('There is no contact, please write');
        return;
    }

    const payload = {
        ...options,
        totalCost,
        tripId,
        tripName,
        tripCode,
    };

    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
        .then(function (response) {
            return response.json();
        }).then(function (parsedResponse) {
            console.log('parsedResponse', parsedResponse);
        });
};

const OrderForm = ({ options, tripCost, setOrderOption, tripName, tripId, tripCode }) => {
    return (
        <Grid>
            <Row>
                {pircing.map(option => (
                    <Col md={4} key={option.id}>
                        <OrderOption key={option.id} currentValue={options[option.id]} setOrderOption={setOrderOption} {...option} />
                    </Col>
                ))}
                <Col xs={12}>
                    <OrderSummary options={options} cost={tripCost} />
                </Col>
            </Row>
            <Button onClick={() => sendOrder(options, tripCost, tripName, tripId, tripCode)}>Order now!</Button>
        </Grid>
    );
};

OrderForm.propTypes = {
    options: PropTypes.object,
    tripCost: PropTypes.node,
    setOrderOption: PropTypes.func,
    tripId: PropTypes.string,
    tripName: PropTypes.string,
    tripCode: PropTypes.string,
};

export default OrderForm;