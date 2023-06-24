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
import RatingForm from "./Ratings/RatingForm";
import Review from "./Ratings/Review";
import { FaStar } from "react-icons/fa";

export const loader = async ({ params }) => {
    const res = await axios.get(`/api/products/${params.itemId}`)
    return { data: res.data }
}

const ItemInfo = () => {
    const { data } = useLoaderData()
    console.log(data)
    const [item, setItem] = useState(data)
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
        <Row className="mb-4">
            <Col xs={12} md={6}>
                <Image src={`/images/${item.url}`} />
            </Col>
            <Col xs={12} md={5}>
                    <h1>{item.title}</h1>
                    <div className="d-flex align-items-center">
                        <FaStar fontSize={30} />
                        <span className="mx-1">{item.foodRating}/5</span>
                        <span>({item.reviews.length} reviews)</span>
                    </div>
                    
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
            <Row className="w-100">
                <RatingForm setItem={setItem} productId={item.id} />
            </Row>
            <Row className="w-100">
                <h2 className="my-3">Reviews</h2>
                {
                    item.reviews.map(review => (
                        <Review key={review._id} review={review}/>
                    ))
                }
            </Row>
    </Container>
    )
}



export default ItemInfo