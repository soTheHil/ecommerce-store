import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';
import { Link, Outlet, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartView from './Components/CartView';
import { useState } from 'react';
import { userSignOut } from './reducers/cartReducer';
import {FaShoppingCart} from 'react-icons/fa'
import './App.css';

function App() {
  const { cartItems, userInfo} = useSelector(state => state.cart)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const handleClose = () => setShow(false)

  const signOutHandler = () => {
    dispatch(userSignOut())
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    window.location.href = '/signin';
  }
  return (
    <div className="App">
      <ToastContainer limit={3} position='bottom-center' />
      <Navbar>
        <Container className='nav' fluid>
          
          <Link className='link' to="/">Soop Eats</Link>
          <Navbar.Collapse className="justify-content-end">
            <Button className="cartBtn" bg="dark" variant="dark" onClick={() => setShow(true)}>
              <FaShoppingCart fontSize={23} color='white'/>{"  "}
              {cartItems.length > 0 &&
                <Badge bg="secondary">
                  {cartItems.reduce((a, c) => {
                    return a += c.quantity
                  }, 0)}
              </Badge>
              }
            </Button>
            {
              userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <Link to="/orders" className='dropdown-link'>
                    Orders
                  </Link>
                  <Link to="#signout" className='dropdown-link' onClick={signOutHandler}>
                    Sign Out
                  </Link>
              </NavDropdown>
              )
              : (
                  <Link className='link mx-3 text-center' to="/signin">
                    Sign In
                  </Link>
              )
            }
            
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
       <Outlet />
      </main>
      <footer>
        Copyright © 2023 Soop Eats. Powered by Soop Eats.
      </footer>
      <CartView show={show} handleClose={handleClose}/>
    </div>
  );
}

export default App;
