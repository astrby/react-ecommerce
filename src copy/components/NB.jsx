import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'

const NB = () => {
  return (
    <>
       <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">TechnoShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/contacto">Contacto</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </>
  )
}

export default NB