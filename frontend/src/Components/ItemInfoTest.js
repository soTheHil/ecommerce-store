//import data from "../data"
import { useLoaderData, Link } from "react-router-dom"
import axios from "axios"

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

export const loader = async ({ params }) => {
    const res = await axios.get(`/api/products/${params.itemId}`)
    return { item: res.data }
}

const ItemInfo = () => {
    const { item } = useLoaderData()
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
        <Button variant="dark" className="w-100">
            Add 1 to Order - R {item.price},00
        </Button>
    </Col>
    </Row> 
</Container>
    )
}



export default ItemInfo