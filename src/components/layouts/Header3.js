import React from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';

const Header3 = () => {
  return (
    <>
      {/* {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => ( */}
      {[false].map((expand) => (
        // <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
        <Navbar
          key="lg"
          expand="lg"
          bg="primary"
          data-bs-theme="dark"
          fixed="top"
        >
          <Container>
            <Navbar.Brand href="/">Money Book</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Money Book
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* <Nav className="justify-content-end flex-grow-1 pe-3"> */}
                <Nav variant="underline">
                  {/* <Nav.Item>
                    <Nav.Link href="/moneybook">MoneyBook</Nav.Link>
                  </Nav.Item> */}
                  <Nav.Link href="/expense">Expense</Nav.Link>
                  <Nav.Link href="/booklist">Notice</Nav.Link>
                  {/* <Nav.Link href="/table">DataTable</Nav.Link>
                  <Nav.Link href="/table2">EnhancedTable</Nav.Link>
                  <Nav.Link href="/table3">DataGridPro</Nav.Link>
                  <Nav.Link href="/chart">SimpleBarChart</Nav.Link> */}
                  <NavDropdown
                    title="Settings"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/settings/category">
                      Category
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/role">Role</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/user">User</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="My Account"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/accountInfo">
                      Account Info
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/accountSettings">
                      Account Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header3;
