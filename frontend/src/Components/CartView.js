import Offcanvas from 'react-bootstrap/Offcanvas'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux'

const CartView = ({ show, handleClose }) => {
    const cart = useSelector(state => state.cart.cart)
    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                {cart.map(item => {
                    return (
                        <Row className="cartItem justify-content-between">
                            <Col sm={6}>
                                <p>{item.title}</p>
                                <p>R {item.price},00</p>
                                <select name="cars" id="cars">
                                    {Array(99).fill(null).map((a, i) => {
                                        return i + 1 === item.quantity
                                            ? <option selected value={item.quantity}>{item.quantity}</option>
                                            : <option value={i + 1}>{i + 1}</option>
                                    })}
                                </select>
                            </Col>
                            <Col sm={3} >
                                <img src={`/images/${item.url}`} alt={`${item.title}`} />
                                <p>R { item.price * item.quantity },00</p>
                            </Col>
                        </Row>
                    )
                })}
                </Stack>
                
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default CartView