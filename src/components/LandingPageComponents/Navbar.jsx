import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router";
import { FaBookOpen } from "react-icons/fa";

const MainNavbar = () => {
  return (
    <Navbar expand="lg" bg="white" className="shadow-sm py-3" sticky="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 d-flex align-items-center gap-2"
        >
          
          <img src='/default-monochrome.svg' alt="logo" width={210} />
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="blog-navbar" />

        <Navbar.Collapse id="blog-navbar">
          {/* Navigation Links */}
          <Nav className="mx-auto gap-lg-3">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link href="#latest">Latest Blogs</Nav.Link>

            <Nav.Link href="#categories">Categories</Nav.Link>

            <Nav.Link href="#about">About</Nav.Link>
          </Nav>

          {/* Authentication Buttons */}
          <div className="d-flex gap-2 mt-3 mt-lg-0">
            <Button
              as={Link}
              to="/login"
              variant="outline-dark"
              className="px-3"
            >
              Login
            </Button>

            <Button as={Link} to="/register" variant="primary" className="px-3">
              Get Started
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
