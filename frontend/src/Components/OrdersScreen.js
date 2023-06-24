import Container from "react-bootstrap/esm/Container"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/esm/Button"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { getMessage } from "../utils"
import BasicSpinner from "./BasicSpinner"

const OrdersScreen = () => {
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.cart)
    const [orderHistory, setOrderHistory] = useState([])

    useEffect(() => {
        const getData = async () => {
            if (!userInfo) {
               // toast.error("No Token")
                navigate("/")
                return
            }
            try {
                const { data } = await axios.get(
                "/api/orders",
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                }
                )
                setOrderHistory(data)
                console.log(data, "orders hsitory")
            } catch (err) {
                toast.error(getMessage(err), {limit: 1})
            } 
    }
        getData()
    }, [userInfo, navigate])

  

    return (
        <Container>
            <h1>Orders</h1>
            {orderHistory.length === 0 &&<BasicSpinner />}
            <Table responsive size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Delivered</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistory.map(order => (
                        <tr key={order._id}>
                            <td>{order._id.slice(0,5)}</td>
                            <td>{ order.createdAt }</td>
                            <td>R{order.totalCost.toFixed(2)}</td>
                            <td>{order.delivered ? "Yes" : "No"}</td>
                            <td>
                                <Button variant="dark" onClick={() => {navigate(`/orderDetails/${order._id}`)}}>
                                    Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default OrdersScreen