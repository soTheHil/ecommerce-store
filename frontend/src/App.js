import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartView from './Components/CartView';
import { useState } from 'react';
import './App.css';

function App() {
  const cart = useSelector(state => state.cart.cart)
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true) 
  const handleClose = () => setShow(false)

  return (
    <div className="App">
      <Navbar>
        <Container className='nav' fluid>
          <Link className='link' to="/">Soop Eats</Link>
          <Navbar.Collapse className="justify-content-end">
            <Button bg="dark" variant="dark" onClick={() => setShow(true)}>
              Cart {cart.length > 0 &&
                <Badge bg="secondary">
                  {cart.reduce((a, c) => {
                    return a += c.quantity
                  }, 0)}
              </Badge>
              }
            </Button>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
       <Outlet />
      </main>
      <CartView show={show} handleClose={handleClose}/>
    </div>
  );
}

export default App;
