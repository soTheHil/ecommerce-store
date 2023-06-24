import Rating from "./Rating"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { getMessage } from "../../utils"
import { useSelector } from "react-redux"
import "./rating.css"

const RatingForm = ({ setItem, productId }) => {
    const [rate, setRate] = useState(0)
    const [comment, setComment] = useState("")
    const {userInfo} = useSelector(state => state.cart)
    const submit = async (e) => {
        e.preventDefault()
        if (rate === 0 || comment === "") {
            toast.error("Please enter a rating and comment")
            return
        }
        try {
            const { data } = await axios.post(
                `/api/reviews/${productId}`,
                { rating: rate, comment },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
            )
            setItem(data)
        } catch (err) {
            toast.error(getMessage(err))
        }
        console.log(Number(rate), comment)
    }

    return (
        <div className="ratingForm">
            <h2>Write a review</h2>
            <Form>
                <Form.Group controlId="rating" className="mb-3">
                    <p>Rating</p>
                    <Rating rate={rate} setRate={ setRate } />
                </Form.Group>
                <Form.Group controlId="comment" className="mb-3">
                    <Form.Label>
                        Comment
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        value={comment}
                        onChange={({target}) => { setComment(target.value) } }
                        rows={3}
                    />
                </Form.Group>
                <Button type="submit"
                    onClick={submit}
                >
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default RatingForm