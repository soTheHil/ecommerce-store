import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { changeQuantity, removeItem } from '../reducers/cartReducer';
import { useDispatch } from 'react-redux';

const CartItem = ({ item }) => {
    const dispatch = useDispatch()
    const handleChange = event => {
        if (event.target.value === "remove") {
            event.target.blur()
            dispatch(removeItem({ id: item.id }))
            return
        }
        else {
            const quantity = Number(event.target.value)
            console.log(quantity, "dropdown")
            dispatch(changeQuantity({id: item.id, quantity }))
        }
    }

    return (
        <Row className="cartItem justify-content-between">
            <Col xs={6}>
                <p>{item.title}</p>
                <p>R {item.price},00</p>
                <select value={item.quantity} id={`${item.title}`} onChange={handleChange}>
                    <option value="remove">remove</option>
                    {Array(99).fill(null).map((a, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </Col>
            <Col xs={3} >
                <img src={`/images/${item.url}`} alt={`${item.title}`} />
                <p className='text-end'>R { item.price * item.quantity },00</p>
            </Col>
        </Row>
    )
}

export default CartItem