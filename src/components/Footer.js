import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <div className="pt-5 pb-5 text-center" style={{ backgroundColor: "#d8d9da" }}>
      <Container className='pb-4 pt-4' style={{ maxWidth: "85%" }}>
        <Row className="mb-4">
          <Col>
            <h4 className="fw-semibold">Trusted Handyman Service for Every Corner of Your House</h4>
          </Col>
        </Row>

        <Row className="mb-4 justify-content-center">
          <Col md={6} className="d-flex flex-column gap-3 align-items-center">
            <a href="tel:6476062540" style={{ color: 'black', textDecoration: 'none' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaPhone className='mr-2' size={20} />
                <span className="fw-semibold">416 997 6627 | 647 606 2540</span>
              </div>
            </a>
            <a href="mailto:solutionsgalaxyhome@gmail.com" target='blank' style={{ color: 'black', textDecoration: 'none' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaEnvelope className='mr-2' size={20} />
                <span className="fw-semibold">solutionsgalaxyhome@gmail.com</span>
              </div>
            </a>
            <a
              href="https://www.google.com/maps/place/Scarborough,+ON"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              <div className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt className='mr-2' size={20} />
                <span className="fw-semibold">Scarborough, ON</span>
              </div>
            </a>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61574817508133"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'black' }}
            >
              <FaFacebook className='mr-3' size={24} />
            </a>
            <a
              href="https://www.instagram.com/mynabackdrops"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'black' }}
            >
              <FaInstagram size={24} />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
