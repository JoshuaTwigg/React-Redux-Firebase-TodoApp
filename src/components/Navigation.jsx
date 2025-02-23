import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom"
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import "./Navigation.css"
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearTasks } from "../redux/taskSlice";

function Navigation(){



  const location = useLocation(); 
  
  const navigate = useNavigate();

  //clear table
  const dispatch = useDispatch();
  dispatch(clearTasks());

  const handleLogOut = (e) =>{
    e.preventDefault();

   const auth = getAuth();

   
    
  signOut(auth)
    .then(() => {
   
      console.log('Logged out successfully');
     
      navigate('/SignIn');
    })
    .catch((error) => {
     
      console.error('Error logging out:', error);
    });
}
    return(
        <div>
        <Navbar bg="dark" variant="dark">
          <Container className="d-flex justify-content-center">
            <Navbar.Brand href="#home" className="mx-auto">TodoApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">

              {location.pathname !== "/Todo" && (<Nav.Link as={Link} to="/" className="nav-item-spacing">Sign Up</Nav.Link>)} 
                {location.pathname !== "/" && location.pathname != "/SignIn" && location.pathname != "/Todo" && (<Nav.Link  as={Link} to="/Todo" className="nav-item-spacing">Home</Nav.Link>)}
                {location.pathname !== "/Todo" && (<Nav.Link  as={Link} to="/SignIn" className="nav-item-spacing">SignIn</Nav.Link>)}
                {location.pathname !== "/" && location.pathname !== "/SignIn" && (<Nav.Link href="#logout" className="nav-item-spacing"  onClick={handleLogOut}> Log out</Nav.Link>)}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>
    )
}

export default Navigation;