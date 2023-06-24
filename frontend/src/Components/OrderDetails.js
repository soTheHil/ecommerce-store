import Container from "react-bootstrap/esm/Container"
import axios from "axios"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Alert from "react-bootstrap/Alert"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getMessage } from "../utils"
import BasicSpinner from "./BasicSpinner"

const OrderDetails = () => {
    const {userInfo} = useSelector(state => state.cart)
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const { orderId } = useParams()
  
    useEffect(() => {
        const getOrder = async () => {
            try {
                const { data } = await axios.get(
                    `/api/orders/${orderId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`
                        }
                    }
                )
                setOrder(data)
                console.log(data, "order")
            }
            catch (err) {
                toast.error(getMessage(err))
            }
        }

        if (!userInfo) navigate("/")
        getOrder()

    }, [orderId, userInfo, navigate])

    if (!order) return (<BasicSpinner/>)
    return (
        <Container>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>
                                Delivery
                            </Card.Title>
                            <Card.Text>
                                <strong>Address: </strong>{order.address}
                            </Card.Text>
                            {order.delivered ? (
                                <Alert>Delivered</Alert>
                            ) : (
                                    <Alert variant="warning">Not Delivered</Alert>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>
                                Items
                            </Card.Title>
                            <ListGroup variant="flush">
                                {order.orderItems.map(item => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img
                                                    src={`/images/${item.url}`}
                                                    alt={item.title}
                                                    className="w-50"
                                                />
                                                <Link to={`/items/${item.product}`}>
                                                    <p>
                                                        {item.title}
                                                    </p>
                                                  
                                                </Link>
                                            </Col>
                                            <Col md={3}>
                                                {item.quantity}
                                            </Col>
                                            <Col md={3}>
                                                R {item.price}.00
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                             <Card.Title>
                                Order Summary
                            </Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Items
                                        </Col>
                                        <Col>
                                          R  {order.itemsCost.toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Delivery
                                        </Col>
                                        <Col>
                                          R  {order.deliveryCost.toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                           <strong>Order Total</strong> 
                                        </Col>
                                        <Col>
                                          R  {order.totalCost.toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderDetails