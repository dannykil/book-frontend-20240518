import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary" fixed="bottom">
          <Container>
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};

export default Footer;
