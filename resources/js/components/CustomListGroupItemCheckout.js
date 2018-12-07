import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    FormControl,
    Popover,
    ButtonToolbar,
    Overlay
} from "react-bootstrap";
import { ROUTES } from "../api/strings";
import styleVariables from '../../sass/base/_variables.scss';

const listItemStyle = {
    borderColor: styleVariables.darken10
}

const quantityFieldStyle = {
    width: '55px'
}

class CustomListGroupItemCheckout extends React.Component{
    constructor(props) {
        super(props);

        // Create a reference for the Remove button that we'll pass to the
        // confirmation dialog overlay.
        this.removeButton = React.createRef();

        this.state = {
            quantity: this.props.quantity,
            showRemoveConfirmation: false
        };
    }

    handleRemoveClick = () => {
        this.setState({
            showRemoveConfirmation: ! this.state.showRemoveConfirmation
        });
    };

    handleConfirmationCancel = () => {
        this.setState({ showRemoveConfirmation: false });
    };

    onQuantityChange = (e) => {
        let quantity = e.target.value;

        if (parseInt(quantity) != quantity ||
            parseInt(quantity) <= 0 ||
            parseInt(quantity) >= 1000
        ) {
            quantity = 1;
        } else {
            quantity = parseInt(quantity);
        }

        this.setState({ quantity });
        this.props.onChangeCartQuantity(this.props.productId, quantity);
    };

    render() {
        return (
            <li style={listItemStyle} className="list-group-item">
                <div className={"media-body"}>
                    <Row>
                        <Col lg={5} md={5} sm={12} xs={12}>
                            <h4 className={"media-heading"}>
                                <Link to={
                                    ROUTES.products.show
                                        .replace(':id', this.props.productId)
                                }>
                                    {this.props.name}
                                </Link>
                            </h4>
                            <div>
                                <ButtonToolbar>
                                    <Button
                                        onClick={this.handleRemoveClick}
                                        ref={this.removeButton}
                                        bsStyle={"link"}
                                        className={"btn-sm"}
                                    >
                                        Remove
                                    </Button>

                                    <Overlay
                                        show={this.state.showRemoveConfirmation}
                                        target={this.removeButton.current}
                                        placement="right"
                                        container={this}
                                        containerPadding={20}
                                    >
                                        <Popover id="popover-contained" title="Are you sure?">
                                            <span>
                                                Remove item from your cart?

                                                <br />
                                                <br />

                                                <Button
                                                    className={"btn-sm"}
                                                    bsStyle={"danger"}
                                                    onClick={this.props.onRemoveFromCart}
                                                >
                                                    Remove
                                                </Button>
                                                <Button
                                                    className={"btn-sm"}
                                                    bsStyle={"link"}
                                                    onClick={this.handleConfirmationCancel}
                                                >
                                                    Cancel
                                                </Button>
                                            </span>
                                        </Popover>
                                    </Overlay>
                                </ButtonToolbar>
                            </div>
                        </Col>

                        <Col lg={5} md={5} sm={12} xs={12} className="text-right">
                            <div className={"checkout-quantity-div"}>
                                <span>Quantity: </span>
                                <span>
                                    <FormControl
                                        type="number"
                                        className="d-inline"
                                        value={this.state.quantity}
                                        onChange={this.onQuantityChange}
                                        style={quantityFieldStyle}
                                    />
                                </span>
                            </div>
                        </Col>

                        <Col md={2} lg={2} sm={12} xs={12} className="text-right">
                            <div className={"checkout-price-div"}>
                              <span className={"cart-price"}>
                                  ${parseFloat(
                                      parseFloat(this.props.price) * parseInt(this.state.quantity)
                                  ).toFixed(2)}
                              </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </li>
        )
    }
}

CustomListGroupItemCheckout.propTypes = {
    onChangeCartQuantity: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
};

export default CustomListGroupItemCheckout;
