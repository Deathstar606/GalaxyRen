import React, {useState} from "react";
import { CardImg, Container, Row, Col, Table, 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, } from "reactstrap";
import { AnimatePresence, motion } from "framer-motion";
import { StaggeredText } from "./TextAnimate";
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
    const [modal, setModal] = useState(false);
    const [duration, setDuration] = useState("not selected");
    const [pickupMethod, setPickupMethod] = useState("not selected");
    const [dropdownOpen1, setDropdownOpen1] = useState(false); // State for the first dropdown
    const [dropdownOpen2, setDropdownOpen2] = useState(false);

    const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);
    const toggleDropdown2 = () => setDropdownOpen2(!dropdownOpen2);

    const handleShow = () => {
        setModal(!modal);
    };

    const handleHide = () => {
        setModal(!modal);
        setDuration("not selected")
        setPickupMethod("not selected")
    };

    let id = 10;

    const feats = Array.from({ length: id }, (_, ind) => {
        return (
            <SwiperSlide
                key={ind} // Add a unique key for each element
                style={{
                    border: "2px solid #ccc",
                    borderRadius: "15px",
                    overflow: "hidden",
                    padding: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                }}
            >
                <CardImg src={Tool}></CardImg>
                <p className="mt-3">short description {ind}</p>
                <div
                    className="butt"
                    onClick={handleShow}
                    style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                    }}
                >
                    Check pricing & availability
                </div>
            </SwiperSlide>
        );
    });

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
          <h1 className="text-center mt-4"><StaggeredText text={"Rent a Tool"}/></h1>
          <h6 className="text-center pb-4 mb-4">Sub Heading for Tool Rental</h6>
          <Container style={{maxWidth: "80%"}}>
            <Row className="pt-4 mt-4">
                <Col md={4} className="d-flex justify-content-center">
                    <div>
                        <CardImg src={icon3} style={{width: "150px"}}></CardImg>
                        <p className="text-center m-0 pt-4">sub pointer 1</p>
                        <p className="text-center">sub pointer 2</p>
                    </div>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                    <div>
                        <CardImg src={icon2} style={{width: "150px"}}></CardImg>
                        <p className="text-center m-0 pt-4">sub pointer 1</p>
                        <p className="text-center">sub pointer 2</p>
                    </div>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                    <div>
                        <CardImg src={icon1} style={{width: "150px"}}></CardImg>
                        <p className="text-center m-0 pt-4">sub pointer 1</p>
                        <p className="text-center">sub pointer 2</p>
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
            {feats}    
          </Swiper>
          <AnimatePresence>
            {modal && (
                <motion.div
                className="modal-back"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                <motion.div
                    className="d-flex justify-content-center m-5"
                    initial={{ opacity: 0, y: -500 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -500 }}
                    transition={{ duration: 0.25, delay: 0.25 }}
                >
                    <Container
                    style={{
                        minHeight: "50vh",
                        backgroundColor: "white",
                        borderRadius: "15px",
                        padding: "40px",
                    }}
                    >
                    <button
                        style={{
                        position: "absolute",
                        top: "0px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        fontSize: "40px",
                        color: "white",
                        cursor: "pointer",
                        }}
                        onClick={handleHide}
                    >
                        &times;
                    </button>
                    <Row>
                        <Col md={6} className="d-flex align-items-center justify-content-center">
                            <CardImg src={Tool}/>
                        </Col>
                        <Col
                        md={6}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "15px",
                        }}
                        >
                        <h3>Description Heading</h3>
                        <p>A short description goes here, providing brief details about the content.</p>
                        <Table>
                            <thead style={{backgroundColor: "gray"}}>
                            <tr>
                                <th>Column 1</th>
                                <th>Column 2</th>
                                <th>Column 3</th>
                                <th>Column 4</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Data 1</td>
                                <td>Data 2</td>
                                <td>Data 3</td>
                                <td>Data 4</td>
                            </tr>
                            <tr>
                                <td>Data 5</td>
                                <td>Data 6</td>
                                <td>Data 7</td>
                                <td>Data 8</td>
                            </tr>
                            </tbody>
                        </Table>
                        <div className="d-flex mb-1">
                            <Dropdown
                                className="mb-2"
                                isOpen={dropdownOpen1}
                                toggle={toggleDropdown1}
                                >
                                <DropdownToggle caret className="butt">
                                    Duration
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                    onClick={() => setDuration("30 minutes")}
                                    >
                                    30 minutes
                                    </DropdownItem>
                                    <DropdownItem onClick={() => setDuration("1 hour")}>
                                    1 hour
                                    </DropdownItem>
                                    <DropdownItem onClick={() => setDuration("2 hours")}>
                                    2 hours
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown
                            className="mb-2"
                            isOpen={dropdownOpen2}
                            toggle={toggleDropdown2}
                            >
                                <DropdownToggle caret className="butt">
                                    Pickup Method
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => setPickupMethod("In-store")}>
                                    In-store
                                    </DropdownItem>
                                    <DropdownItem onClick={() => setPickupMethod("Curbside")}>
                                    Curbside
                                    </DropdownItem>
                                    <DropdownItem onClick={() => setPickupMethod("Delivery")}>
                                    Delivery
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="ml-2 mt-2">
                            <p className="text-muted">Duration: {duration}</p>
                            <p className="text-muted">Pick up method: {pickupMethod}</p>
                        </div>
                        <div className="butt" style={{display: "inline-block"}}>
                            Request Reservation
                        </div>
                        </Col>
                    </Row>
                    </Container>
                </motion.div>
                </motion.div>
                )}
            </AnimatePresence>      
        </motion.div>
    )
}

export default HomeD