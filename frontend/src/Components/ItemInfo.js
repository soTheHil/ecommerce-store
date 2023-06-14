//import data from "../data"
import { useLoaderData, Link } from "react-router-dom"
import axios from "axios"

export const loader = async ({ params }) => {
    const res = await axios.get(`/api/products/${params.itemId}`)
    return { item: res.data }
}

const ItemInfo = () => {
    const { item } = useLoaderData()
    if (!item) return <p>Not found...sorry</p>

    return (
        <div className="itemContainer">
            <div className="itemImage">
                <Link to="/" className="link">Go Back</Link>
                <img src={`/images/${item.url}`} alt={item.title} />
            </div>
            <div className="itemInfo">
                <h1>{item.title}</h1>
                <h2>R {item.price},00</h2>
                <p>{item.description}</p>
                <button>
                    Add 1 to Order - R {item.price},00
                </button>
            </div>
        </div>
    )
}

export default ItemInfo