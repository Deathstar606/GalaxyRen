import React from "react";
import demo from "../images/HomeD/location.png"
import { motion } from "framer-motion";
import { Card, CardImg, Col, Container, Row } from "react-bootstrap";
import { CardBody, CardText } from "reactstrap";

function Moto () {
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <motion.div
                        className="m-2"
                        initial = {{y: 50, opacity: 0}}
                        transition={{duration: 1, type: "tween", ease: "easeIn"}}
                        whileInView={{y: 0, opacity: 1}}>
                        <Card style={{borderRadius: "20px"}}>
                            <CardBody>
                                <div className="d-flex justify-content-center">
                                    <CardImg style={{width: "100px", padding: "10px", margin: "10px"}} src={demo}/>
                                </div>
                                <CardText className="text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur.
                                </CardText>
                            </CardBody>
                        </Card>                        
                    </motion.div>
                </Col>
                <Col md={4}>
                    <motion.div
                        className="m-2"
                        initial = {{y: 50, opacity: 0}}
                        transition={{duration: 1, type: "tween", ease: "easeIn"}}
                        whileInView={{y: 0, opacity: 1}}>
                        <Card style={{borderRadius: "20px"}}>
                            <CardBody>
                                <div className="d-flex justify-content-center">
                                    <CardImg style={{width: "100px", padding: "10px", margin: "10px"}} src={demo}/>
                                </div>
                                <CardText className="text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur.
                                </CardText>
                            </CardBody>
                        </Card>                        
                    </motion.div>
                </Col>
                <Col md={4}>
                    <motion.div
                        className="m-2"
                        initial = {{y: 50, opacity: 0}}
                        transition={{duration: 1, type: "tween", ease: "easeIn"}}
                        whileInView={{y: 0, opacity: 1}}>
                        <Card style={{borderRadius: "20px"}}>
                            <CardBody>
                                <div className="d-flex justify-content-center">
                                    <CardImg style={{width: "100px", padding: "10px", margin: "10px"}} src={demo}/>
                                </div>
                                <CardText className="text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur.
                                </CardText>
                            </CardBody>
                        </Card>                        
                    </motion.div>
                </Col>
            </Row>
        </Container>
    )
}

export default Moto