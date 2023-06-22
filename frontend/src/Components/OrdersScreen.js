import Container from "react-bootstrap/esm/Container"
import Table from "react-bootstrap/Table"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getMessage } from "../utils"

const OrdersScreen = () => {
    const {userInfo} = useSelector(state => state.cart)
    const [orderHistory, setOrderHistory] = useState([])

    useEffect(() => {
        const getData = async () => {
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
            toast.error(getMessage(err))
        } 
    }
        getData()
    }, [userInfo])

    return (
        <Container>
            <h1>Orders</h1>
            <Table>
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
                            <td>{order._id}</td>
                            <td>122</td>
                            <td>{order.totalCost}</td>
                            <td>{order.delivered ? "Yes" : "No"}</td>
                            <td>Details</td>
                        </tr>
                    ))}
                    <tr>
                        <td>nice</td>
                        <td>nic1e</td>
                        <td>nice2</td>
                        <td>nice2</td>
                        <td>nic3e</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default OrdersScreen