import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
// import nature1 from './nature1.webp';
// import nature2 from './nature2.avif';
import nature3 from './nature3.jpg';

const ExampleCarouselImage = () => {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src={nature3} rounded />
        </Col>
        {/* <Col xs={6} md={4}>
          <Image src="/nature1.webp/171x180" roundedCircle />
        </Col>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" thumbnail />
        </Col>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" thumbnail />
        </Col> */}
      </Row>
    </Container>
  );
};

export default ExampleCarouselImage;
