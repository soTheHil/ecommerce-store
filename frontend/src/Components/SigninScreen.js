import {toast} from "react-toastify"
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getMessage } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { userSignIn } from '../reducers/cartReducer'

const SigninScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const userInfo = useSelector(state => state.cart.userInfo)

    let [searchParams] = useSearchParams()
    const redirectInUrl = searchParams.get("redirect")
    const redirect = redirectInUrl ? redirectInUrl : '/'
    console.log(redirect, "redirect")
    useEffect(() => {
        if (userInfo) navigate(redirect)
    }, [userInfo, redirect, navigate])

    const submit = async (e) => {
        e.preventDefault()
        console.log(redirect)
        try {
            const { data } = await axios.post("/api/users/signin", {
                email,
                password
            })
            dispatch(userSignIn(data))
            localStorage.setItem("userInfo", JSON.stringify(data))
            console.log(data)
        }
        catch (e) {
            console.log(e)
            toast.error(getMessage(e))
            return
        }
        navigate(redirect)
    }

    return (
        <Container className="signInContainer">
            <h1 className="mb-4">Sign In</h1>
            <Form id="signIn" onSubmit={submit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label required>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        onChange={ ({target}) => setEmail(target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId='formBasicPassword'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        name="password"
                        placeholder="Enter password"
                        type="password"
                        required
                        onChange={ ({target}) => setPassword(target.value)}
                    />
                </Form.Group>
                <Button  className="mb-3 w-100" type="submit" bg="dark" variant="dark">
                    Submit
                </Button>
                <Container className="d-flex justify-content-center">
                    <p>New customer?{" "}
                    <Button
                        onClick={() => {
                            navigate(`/signup?redirect=${redirect}`)
                        }}
                    >
                        Create your account
                    </Button>
                    {/* <Link to={`/signup?redirect=${redirect}`}>Create your account</Link> */}
                </p>
                </Container>
                
                
            </Form>
        </Container>
    )
}

export default SigninScreen