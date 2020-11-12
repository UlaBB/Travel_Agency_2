import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderFrom.scss';
import { Grid, Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pircing from './../../../data/pricing.json';
import OrderOption from './../OrderOption/OrderOption';


const OrderForm = ({ options, tripCost, setOrderOption }) => {
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
        </Grid>
    );
};

OrderForm.propTypes = {
    options: PropTypes.object,
    tripCost: PropTypes.node,
    setOrderOption: PropTypes.func,
};

export default OrderForm;