import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Row, Form, FormGroup, Label, Input, Container, Col, CardImg } from 'reactstrap';
import contact from "../images/hero-image.fill.size_1248x702.v1703441414.jpg"

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        jobType: '',
        jobDescription: '',
    });

    const [currentPanel, setCurrentPanel] = useState('details');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNext = () => {
        if (currentPanel === 'details') {
            setCurrentPanel('job');
        }
    };

    const handlePrevious = () => {
        if (currentPanel === 'job') {
            setCurrentPanel('details');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <motion.div
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
        <Container className="d-flex justify-content-center" style={{ height: "70vh",paddingTop: "20vh", marginBottom: "10rem" }}>
            <Col sm="12" md="6">
                <Form onSubmit={handleSubmit} style={{ overflow: "hidden" }}>
                    <AnimatePresence mode='wait'>
                        {currentPanel === 'details' && (
                            <motion.div
                                key="details"
                                transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
                                initial={{ x: 1000, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -1000, opacity: 0 }}
                            >
                                <h3 className='text-center pb-4'>Contact Information</h3>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        style={{ borderRadius: "10px" }}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        style={{ borderRadius: "10px" }}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        style={{ borderRadius: "10px" }}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <div className='d-flex justify-content-center pt-2'>
                                    <button
                                        className='butt'
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!formData.name || !formData.email || !formData.address}
                                    >
                                        Next
                                    </button>
                                </div>
                            </motion.div>
                        )}
                        {currentPanel === 'job' && (
                            <motion.div
                                key="job"
                                transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
                                initial={{ x: 1000, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -1000, opacity: 0 }}
                            >
                                <h3 className='text-center pb-4'>Job Information</h3>
                                <FormGroup>
                                    <Label for="jobType">Job Type</Label>
                                    <Input
                                        type="select"
                                        id="jobType"
                                        name="jobType"
                                        value={formData.jobType}
                                        style={{ borderRadius: "10px", margin: "10px" }}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Job Type</option>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Freelance">Freelance</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="jobDescription">Job Description</Label>
                                    <Input
                                        type="textarea"
                                        id="jobDescription"
                                        name="jobDescription"
                                        value={formData.jobDescription}
                                        style={{ borderRadius: "10px", height: "300px", resize: "none" }} // Ensures consistent width
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <div className='d-flex justify-content-center pt-2'>
                                    <button
                                        className='butt'
                                        type="button"
                                        onClick={handlePrevious}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className='butt'
                                        type="submit"
                                        disabled={!formData.jobType || !formData.jobDescription}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Form>
            </Col>
        </Container>
                <Row className="w-100" style={{backgroundColor: "#00084c", padding: "4rem"}}>
                    <Col md={6} className="d-flex justify-content-center">
                        <CardImg
                            src={contact}
                            style={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}
                        ></CardImg>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div className='home-butt'>
                            <p className='text-white'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <div style={{display: "inline-block"}} className="butt">Contact</div>
                        </div>
                    </Col>
                </Row>
        </motion.div>
    );
};

export default AppointmentForm;
