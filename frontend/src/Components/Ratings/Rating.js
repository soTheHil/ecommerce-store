import { FaStar } from "react-icons/fa"

const Rating = ({rate, setRate}) => {
    
    return (
        <div>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1
                return (
                    <label key={givenRating} className="starLabel">
                        <input
                            id={givenRating}
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                setRate(givenRating)
                            }}
                            className="radioBtn"
                        />
                        <FaStar
                            id={givenRating}
                            fontSize={25}
                            className="mx-1"
                            color={givenRating <= rate ? "black" : "gray"}
                        />
                    </label>
                )
            })}
       </div> 
    )
}

export default Rating