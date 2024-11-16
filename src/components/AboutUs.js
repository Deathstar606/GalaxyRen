import React from "react";
import aboutPic from "../images/HandymanServices-Part-3-Image.jpg"
import { motion } from "framer-motion";
import { Col, Container, Row, CardImg } from "reactstrap";

function About() {
    return (
        <motion.div
        style={{ backgroundColor: "#00084c", paddingTop: "2rem" }}
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
            <Container
                style={{ minHeight: "100vh" }}
                className="d-flex align-items-center justify-content-center"
            >
                <Row className="w-100">
                    <Col md={6} className="d-flex justify-content-center">
                        <motion.div
                        style={{width: "100%"}}
                        initial = {{x: -50, opacity: 0}}
                        transition={{duration: 1, type: "tween", ease: "easeIn"}}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{ once: true }}>
                            <CardImg
                                src={aboutPic}
                                style={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%", borderRadius: "15px" }}
                            ></CardImg>
                        </motion.div>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div style={{color: "#d8d9da"}} className="home-butt">
                            <p>
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
            </Container>
        </motion.div>
    );
}

export default About;
