const Product = ({product}) => {
    const { title, url, price } = product
    return (
        <div className='product'>
            <div className='productImage'>
                <img src={`/images/${url}`} alt='game' />
            </div>
            
            <div className="description">
                <p className="title">{title}</p>
                <p id="price">R {price}</p>
            </div>
            <div className="btnContainer">
                <button className="viewBtn">
                    More Info
                </button>
                <button className="addBtn">
                    add to cart
                </button>
            </div>
        </div>
    )
}

export default Product