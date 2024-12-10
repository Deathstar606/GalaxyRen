import React from "react";
import { CardImg, Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import Head from "../images/HomeD/hero-image.fill.size_1248x702.v1703441414.jpg"
import Tool from "../images/HomeD/0535586_cordless-drill-machine-cd144v.jpeg"
import icon1 from "../images/HomeD/location.png"
import icon2 from "../images/HomeD/tools.png"
import icon3 from "../images/HomeD/user.png"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

function HomeD () {
    return (
        <motion.div
        className="pb-5"
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
        <div className='d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh' }}>
        <CardImg src={Head} style={{ height: '100vh', width: '100%', objectFit: 'cover' }} />
        <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
            <h1 
            className="mb-1 pb-3 text-center" 
            style={{
                fontSize: "clamp(44px, 4vw, 70px)", 
                color: "white",
                textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 255, 255, 0.8)"
            }}
            >
            This is a demo head
            </h1>
        </div>
        </div>
          <h1 className="text-center mt-4">Rent a Tool</h1>
          <h6 className="text-center pb-4 mb-4">Sub Heading for Tool Rental</h6>
          <Container style={{maxWidth: "80%"}}>
            <Row className="pt-4 mt-4">
                <Col md={4} className="d-flex justify-content-center">
                    <div>
                        <CardImg src={icon3} style={{maxWidth: "250px"}}></CardImg>
                        <ul className="mt-4">
                            <li>sub pointer 1</li>
                            <li>sub pointer 2</li>
                        </ul>
                    </div>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                    <div>
                        <CardImg src={icon2} style={{maxWidth: "250px"}}></CardImg>
                        <ul className="mt-4">
                            <li>sub pointer 1</li>
                            <li>sub pointer 2</li>
                        </ul>
                    </div>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                    <div>
                        <CardImg src={icon1} style={{maxWidth: "250px"}}></CardImg>
                        <ul className="mt-4">
                            <li>sub pointer 1</li>
                            <li>sub pointer 2</li>
                        </ul>
                    </div>
                </Col>
            </Row>
          </Container>
          <h1 className="p-5">Rent the product</h1>
          <Swiper
          style={{marginLeft: "40px"}}
          slidesPerView={9}
          spaceBetween={20}
          modules={[Navigation]}
          navigation
          >
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
            <SwiperSlide style={{
                border: "2px solid #ccc", 
                borderRadius: "15px", 
                overflow: "hidden", 
                padding: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description</p>
                <div 
                className="butt" 
                style={{ 
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                    }}>
                    Check pricing & availability
                </div>
            </SwiperSlide>
          </Swiper>
        </motion.div>
    )
}

export default HomeD