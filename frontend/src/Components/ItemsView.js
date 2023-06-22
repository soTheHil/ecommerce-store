import Product from "./Product"
//import data from "../data"
import { useLoaderData } from "react-router-dom"
import axios from 'axios'

export const loader = async () => {
    const response = await axios.get('/api/products')
    console.log(response.data, 'rsponse from axios items')
    return { items: response.data }
}

const ItemsView = () => {
    const { items } = useLoaderData()
    return (
        <div className="productsView">
            {items.map(i => <Product key={i.id} product={ i } />)}
        </div>
    )

}

export default ItemsView