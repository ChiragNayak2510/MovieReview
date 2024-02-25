import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import Button  from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Container 
        fluid>
          <Navbar.Brand href="/" style={{"color":'gold'}}>
            <FontAwesomeIcon icon={faVideoSlash}/>Gold
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll'/>
          <Navbar.Collapse id = "navbarScroll">
            <Nav className='me-auto my-2 my-lg-0'
                style = {{maxHeight:'100px'}}
                navbarScroll>
                  <NavLink className="nav-link" to="/">Home</NavLink>
                  <NavLink className="nav-link" to="/watchlist">WatchList</NavLink>
                </Nav>
              <NavLink to="/login">
              <Button variant="danger" color="error" className='me-2'>Sign In</Button>
              </NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
