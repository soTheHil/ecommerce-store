import Offcanvas from 'react-bootstrap/Offcanvas'
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/esm/Button';
import CartItem from './CartItem';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

const CartView = ({ show, handleClose }) => {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart.cartItems)
    console.log(cart, "cart")
    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <h1>Shopping Cart</h1>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cart.map(item => {
                        return (
                        <CartItem key={item.id} item={item} />
                        )
                    })}
                    <Row className='subtotal justify-content-between'>
                        <Col xs={6}>
                            Subtotal
                        </Col>
                        <Col xs={6} className='text-end'>
                            R {cart.reduce((a, c) => {
                                return a + (c.quantity * c.price)
                            }, 0) },00
                        </Col>
                    </Row>
                    {
                        cart.length === 0 ? (
                            <Alert>
                                Your cart is empty.{" "}
                                <Button onClick={() => {
                                    handleClose()
                                    navigate("/")
                                }}>
                                    Go Shopping
                                </Button>
                            </Alert>
                        ) :
                        (
                            <Button bg="dark" variant="dark" onClick={() => {
                                handleClose()
                                navigate("/signin?redirect=/delivery")
                            }}>
                            Go to checkout
                            </Button>
                        )
                    }
                </Stack>
              
                
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default CartView