import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <div /* className='mt-5' */ style={{backgroundColor: "#d8d9da"}}>
        <Container style={{maxWidth: "85%"}}>
            <Row>
                <Col md={5}>
                    <h1 style={{paddingBottom: "5%", paddingTop: "10%"}}>Fashion for those who appreciate quality</h1>
                </Col>
            </Row>
            <Row>
                <div className='d-flex' style={{paddingBottom: "10%"}}>
                    <Col md={12} xs={10} style={{ paddingRight: '5px'}} className='d-flex'> {/* Added inline style to reduce right padding */}
                        <Form style={{width: "100%"}}>
                            <Form.Group>
                                <Form.Control
                                    style={{ borderRadius: "15px", borderWidth: "2px", height: "40px", borderColor: "#909090" }}
                                    placeholder='Your Mail Address'
                                    type="email"
                                    name="email"
                                    required
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Button variant="light" type="submit" style={{ borderRadius: "15px" }}>
                        Send
                    </Button>
                </div>
                <Col md={4}></Col>
                <Col md={2} xs={6}>
                    <ul style={{ listStyleType: 'none' }}>
                        <li className='mb-4'>Home</li>
                        <li className='mb-4'>Category</li>
                        <li className='mb-4'>Know Us</li>
                    </ul>
                </Col>
                <Col md={2} xs={6}>
                    <ul style={{ listStyleType: 'none' }}>
                        <li className='mb-4'>Shirts</li>
                        <li className='mb-4'>Pants</li>
                        <li className='mb-4'>Hoodies</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default Footer;