import { connect } from 'react-redux';
import OrderForm from './OrderForm';
// import { getOrderOptions } from '../../../redux/orderRedux';
import { getOrderOptions, setOrderOption } from '../../../redux/orderRedux';

const mapStateToProps = state => ({
    options: getOrderOptions(state),
});


const mapDispatchToProps = dispatch => ({
    setOrderOption: option => dispatch(setOrderOption(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
