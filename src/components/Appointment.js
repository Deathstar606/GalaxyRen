import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Row, Form, FormGroup, Label, Input, Container, Col, CardImg, Button } from 'reactstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { baseUrl } from '../shared/baseurl';
import axios from 'axios';
import contact from "../images/contact2.jpg"

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
    });
    
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
          data.append(key, formData[key]);
        }
        if (image) {
          data.append('image', image);
        }

        try {
            const response = await axios.post(baseUrl + "contact", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <motion.div
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
        <Container className="d-flex justify-content-center" style={{ paddingTop: "5vh", marginBottom: "10rem"}}>
                <Form onSubmit={handleSubmit} style={{ overflow: "hidden", width: "100%" }}>
                    <AnimatePresence mode='wait'>
                            <motion.div
                                key="details"
                                transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
                                initial={{ x: 1000, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -1000, opacity: 0 }}
                            >
                                <h3 className='text-center pb-4'>Contact Information</h3>
                                <Row className='pt-4'>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="phone">Phone</Label>
                                            <Input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                            <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="address">Address</Label>
                                            <Input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            <Input style={{height: "100px"}} type="textarea" name="description" id="description" value={formData.description} onChange={handleChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="image">Upload Image</Label>
                                            <div className="custom-file">
                                                <Input type="file" className="custom-file-input" name="image" id="image" onChange={handleImageChange} accept="image/*" />
                                                <Label className="custom-file-label" for="image">Choose file</Label>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {imagePreview && (
                                    <Row className="mb-3">
                                        <Col md={12} className="text-center">
                                            <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", marginTop: "10px" }} />
                                        </Col>
                                    </Row>
                                )}
                                <Button style={{display: "inline-block"}} type="submit" className='butt'>Submit</Button>
                            </motion.div>
                    </AnimatePresence>
                </Form>
        </Container>
        <div style={{backgroundColor: "#00084c",}}>
            <Container style={{minWidth: "65vw"}}>
                <Row className='pt-5 pb-4' style={{padding: "1rem"}}>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <CardImg
                            className="mb-4"
                            src={contact}
                            style={{ objectFit: "cover", width: "100%", borderRadius: "15px" }}
                        ></CardImg>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div>
                            <p className='text-white'>
                                Have a question, need a quote, or ready to book a service? We’re here to help! At Galaxy Home Solutions, we take pride in fast responses, clear communication, and reliable service—every time.
                            </p>
                            <div className='mt-5'>
                                <a href="tel:416123-4567" style={{ color: 'white', textDecoration: 'none' }}>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span className='mr-2'>Phone/Text:</span>
                                        <span className="fw-semibold">416 123-4567</span>
                                    </div>
                                </a>
                                <a href="mailto:solutionsgalaxyhome@gmail.com" target='blank' style={{ color: 'white', textDecoration: 'none' }}>
                                    <div className="d-flex align-items-center gap-2 mb-2 pt-2">
                                        <FaEnvelope className='mr-2' size={20} />
                                        <span className="fw-semibold">solutionsgalaxyhome@gmail.com</span>
                                    </div>
                                </a>
                                <p className='text-white pt-2'>📍 Service Area: Proudly serving Toronto, the GTA, and surrounding areas.</p>
                                <p className='text-white'>Hours: Available 7 days a week</p>
                            </div>                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </motion.div>
    );
};

export default AppointmentForm;
