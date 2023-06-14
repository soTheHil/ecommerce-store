import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addItem } from "../reducers/cartReducer"

const Product = ({ product }) => {
    const { title, url, price } = product
    const dispatch = useDispatch()
    const addToCart = (e) => {
        e.stopPropagation()
        dispatch(addItem({ ...product, quantity: 1 }))
    }
    return (
         
        <div className='product'>
            <Link to={`/items/${product.id}`} className="link">
                <div className='productImage'>
                    <img src={`/images/${url}`} alt='game' />
                </div>
                <div className="description">
                    <p className="title">{title}</p>
                    <p id="price">R {price},00</p>
                </div>
            </Link>
                <button className="addBtn" onClick={addToCart}>
                    Order
                </button>
            </div>
           
    )
}

export default Product