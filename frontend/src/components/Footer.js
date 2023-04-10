import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light p-3 mt-3">
      <Container>
        <Row>
          <Col lg={3} md={6} sm={12}>
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              ac dui sed ex dictum viverra ac sed nisl.
            </p>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li>Help & Contact</li>
              <li>Returns & Refunds</li>
              <li>Online Orders</li>
              <li>Shipping & Delivery</li>
            </ul>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <h5>Connect with Us</h5>
            <ul className="list-unstyled">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <h5>Subscribe to Our Newsletter</h5>
            <p>Sign up for exclusive offers, updates, and new products.</p>
            <form>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </Col>
        </Row>
      </Container>
      <div className="bg-secondary py-3 m-3">
        <Container>
          <Row>
            <Col md={6}>
              <p className="m-0 text-center text-md-left">
                &copy; 2023 Amazon.com. All rights reserved.
              </p>
            </Col>
            <Col md={6}>
              <ul className="list-inline mb-0 text-center text-md-right">
                <li className="list-inline-item">
                  <a href="#">Privacy Policy</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Terms of Use</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Accessibility</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Ad Choices</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
