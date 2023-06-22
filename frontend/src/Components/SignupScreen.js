import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { userSignIn } from '../reducers/cartReducer'
import { getMessage } from '../utils'
import axios from 'axios'

const SignupScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.cart.userInfo)

    let [searchParams] = useSearchParams()
    const redirectInUrl = searchParams.get("redirect")
    const redirect = redirectInUrl ? redirectInUrl : "/"

    const submit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        try {
            const { data } = await axios.post("/api/users/signup", { name, email, password })
            dispatch(userSignIn(data))
            localStorage.setItem("userInfo", JSON.stringify(data))
            navigate(redirect || "/")
        }
        catch(err) {
            toast.error(getMessage(err))
            console.log(err)
        }
       
        console.log(redirect, "redirect")
    }

    useEffect(() => {
        if (userInfo) navigate(redirect)
    },[navigate, userInfo, redirect])

    return (
        <Container className="signInContainer">
            <h1 className="mb-4">Sign Up</h1>
            <Form id="signUp" onSubmit={submit}>
                 <Form.Group className='mb-3'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        required
                        onChange={({target}) => setName(target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={({target}) => setEmail(target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId='formBasicPassword'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        placeholder="Enter password"
                        type="password"
                        required
                        onChange={({target}) => setPassword(target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        placeholder="Enter password"
                        type="password"
                        required
                        onChange={({target}) => setConfirmPassword(target.value)}
                    />
                </Form.Group>
                <Button  className="mb-3" type="submit" bg="dark" variant="dark">
                    Submit
                </Button>
                <p>Already have an account?{" "}
                    <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                </p>
                
            </Form>
        </Container>
    )
}

export default SignupScreen