import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { getMessage } from "../utils";
import BasicSpinner from "./BasicSpinner";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { clearCart } from "../reducers/cartReducer";

const DeliveryScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState('')
    const { cartItems, userInfo } = useSelector(state => state.cart)
    const itemsCost = cartItems.reduce((a, c) => {
        return a + (c.price * c.quantity)
    }, 0)
    const deliveryCost = itemsCost >= 200 ? 30 : 0
    const totalCost = itemsCost + deliveryCost
   // console.log(cartItems, userInfo, itemsCost, totalCost)

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        }
    }, [cartItems, userInfo, navigate])
    
    const submit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            console.log("yay")
            const {data} = await axios.post(
                "/api/orders",
                {
                    orderItems: cartItems,
                    itemsCost,
                    deliveryCost,
                    totalCost,
                    address
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                }
            )
            dispatch(clearCart())
            localStorage.removeItem("cartItems")
            setLoading(false)
            navigate("/orders")
            console.log(data)
            console.log("yayaya")
        } catch (err) {
            toast.error(getMessage(err))
        }
    }

    return (
        <Container className="delivery">
            <h1 className="text-center">Delivery</h1>
            {loading ? <BasicSpinner /> : null}
            <Form onSubmit={submit}>
                <Form.Group>
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={address}
                        onChange={({target}) => { setAddress(target.value)}}
                    />
                </Form.Group>
                <h2 className="text-center">Payment Details</h2>
                <Form.Group className="my-3">
                    <Form.Label>
                        Credit Card Number
                    </Form.Label>
                    <Form.Control
                        type="text"
                        required
                        pattern="[0-9]+"
                    />
                </Form.Group>
                <Row className="my-3">
                    <Col sm={6}>
                        <Form.Group>
                            <Form.Label>
                                Expiry Date
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                pattern="[0-9]+"
                            />
                        </Form.Group>
                    </Col>
                     <Col sm={6}>
                        <Form.Group>
                            <Form.Label>
                                CVV
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                pattern="[0-9]+"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="checkout-price">
                    <Col xs="auto">Items</Col>
                    <Col xs="auto">R {itemsCost},00</Col>
                </Row>
                <Row className="checkout-price">
                    <Col xs="auto">Delivery</Col>
                    <Col xs="auto">R {deliveryCost},00</Col>
                </Row>
                <Row className="checkout-price">
                    <Col xs="auto">Total Payment</Col>
                    <Col xs="auto">R {totalCost},00</Col>
                </Row>
                <Button disabled={cartItems.length === 0} className="w-100 mt-2" type="submit" variant="dark" bg="dark">
                    Pay
                </Button>

            </Form>
          
        </Container>
    )
}

export default DeliveryScreen