import React from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormCheck,
  FormSelect,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryDetailInformation = () => {
  return (
    <Card className="mb-2">
      <Card.Header as="h5">Category Detail Info.</Card.Header>
      <Card.Body>
        <Row className="g-2">
          {/* <Col xs="auto">
            <FormCheck // prettier-ignore
              className="mb-3 mt-3"
              type="checkbox"
              id={`default-checkbox`}
              label={``}
            />
          </Col> */}
          <Col md>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="Category Detail"
            >
              <Form.Control type="input" placeholder="categoryDetail" />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Note">
              <Form.Control type="input" placeholder="note" />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingSelectGrid" label="Use YN">
              <Form.Select aria-label="Floating label select example">
                <option value="Y">Y</option>
                <option value="N">N</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          {/* <Col md>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Works with selects"
              >
                <Form.Select aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col> */}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CategoryDetailInformation;
