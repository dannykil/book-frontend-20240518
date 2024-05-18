import React, { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" bg="primary" data-bs-theme="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Navbar bg="primary" className="fixed-top" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Brand onClick={handleShow}>
            <Link className="nav-link">Book</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/category">Category</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/category">Category</Nav.Link>
          </Nav>
        </Container>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Link to="/" className="nav-link" onClick={handleClose}>
                Home
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
            <Link to="/saveForm" className="nav-link" onClick={handleClose}>
              글쓰기
            </Link>
          </Offcanvas.Body>
        </Offcanvas>
        <Link
          to="/LoginForm"
          style={{ position: 'absolute', right: 50, marginRight: '30px' }}
        >
          Login
        </Link>
        <Link
          to="/JoinForm"
          style={{ position: 'absolute', right: 0, marginRight: '30px' }}
        >
          Join
        </Link>
      </Navbar> */}
    </>
    // <Navbar bg="primary" variant="dark">
    //   <Container>
    //     <Link to="/" className="navbar-brand">
    //       홈
    //     </Link>
    //     <Nav className="me-auto">
    //       <Link to="/joinForm" className="nav-link">
    //         회원가입
    //       </Link>
    //       <Link to="/loginForm" className="nav-link">
    //         로그인
    //       </Link>
    //       <Link to="/saveForm" className="nav-link">
    //         글쓰기
    //       </Link>
    //     </Nav>
    //   </Container>
    // </Navbar>
  );
};

export default Header;
