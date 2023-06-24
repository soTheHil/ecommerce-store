import Card from "react-bootstrap/Card"
import "./rating.css"
import { FaStar } from "react-icons/fa"

const Review = ({review}) => {
    return (
        <Card className="review"> 
            <Card.Text><strong>{review.user.name}</strong></Card.Text>
            <p>
                {[...Array(review.rating)].map((r, i) => <FaStar key = {i}  />)}
                
            </p>
            <p className="mb-2">{review.createdAt}</p>
            
            <Card.Text>{ review.comment }</Card.Text>
        </Card>
    )
}

export default Review