//import data from "../data"
import { useLoaderData, Link } from "react-router-dom"
import axios from "axios"

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../reducers/cartReducer";

export const loader = async ({ params }) => {
    const res = await axios.get(`/api/products/${params.itemId}`)
    return { item: res.data }
}

const ItemInfo = () => {
    const { item } = useLoaderData()
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setQuantity(Number(e.target.value))
    }
    
    const addToCart = () => {
        dispatch(addItem({  ...item, quantity }))
    }

    if (!item) return <p>Not found...sorry</p>

    return (
    <Container>
        <Row className="mb-3">
            <Col>
                <Link to="/" className="link">Go Back</Link>
            </Col> 
        </Row>
        <Row >
            <Col xs={12} md={6}>
                <Image src={`/images/${item.url}`} />
            </Col>
            <Col xs={12} md={5}>
                <h1>{item.title}</h1>
                <h2>R {item.price},00</h2>
                <p>{item.description}</p>
                <select className="itemSelect" value={quantity} id={`${item.title}`} onChange={handleChange}>
                    {Array(99).fill(null).map((a, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>       
                <Button variant="dark" className="w-100" onClick={addToCart}>
                    Add {quantity} to Order - R {item.price * quantity},00
                </Button>
            </Col>
        </Row> 
    </Container>
    )
}



export default ItemInfo