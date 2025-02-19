import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <div className='pt-4 pb-4' style={{ backgroundColor: "#d8d9da", padding: "3% 0" }}>
      <Container style={{ maxWidth: "85%" }}>
        <Row>
          <Col md={5}>
            <h1 style={{ paddingBottom: "5%" }}>We're only one call away</h1>
          </Col>
        </Row>
        <Row>
          <Col md={3} xs={6}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li className='mb-3'>Contact Us</li>
              <li className='mb-3'>Free Estimation</li>
              <li className='mb-3'>Rent Tool</li>
            </ul>
          </Col>
          <Col md={3} xs={6}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li className='mb-3'>About Us</li>
              <li className='mb-3'>Services</li>
            </ul>
          </Col>
          <Col md={3} xs={12} className='mt-3 mt-md-0'>
            <p><strong>Phone:</strong> 01954379684</p>
            <p><strong>Email:</strong> dsfardin606@gmail.com</p>
            <p><strong>Location:</strong> 123 Main Street, City Name</p>
          </Col>
          <Col md={3} xs={12} className='mt-3 mt-md-0 d-flex align-items-center justify-content-center'>
            <FaFacebook size={24} className='mx-2' />
            <FaInstagram size={24} className='mx-2' />
            <FaTwitter size={24} className='mx-2' />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
