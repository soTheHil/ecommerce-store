import Product from "./Product"
//import data from "../data"
import { useLoaderData } from "react-router-dom"
import axios from 'axios'

export const loader = async () => {
    const response = await axios.get('/api/products')
    console.log(response, 'rsponse from axios')
    return { items: response.data }
}

const ItemsView = () => {
    const { items } = useLoaderData()
    return (
        <div className="productsView">
            {items.map(i => <Product product={ i } />)}
        </div>
    )

}

export default ItemsView