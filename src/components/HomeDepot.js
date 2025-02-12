import React, {useState} from "react";
import { CiLocationOff } from "react-icons/ci";
import { CardImg, Container, Row, Col, Table, 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, } from "reactstrap";
import { AnimatePresence, motion } from "framer-motion";
import { StaggeredText } from "./TextAnimate";
import axios from "axios";
import { baseUrl } from "../shared/baseurl";
import Head from "../images/HomeD/hero-image.fill.size_1248x702.v1703441414.jpg"
import icon1 from "../images/HomeD/location.png"
import icon2 from "../images/HomeD/tools.png"
import icon3 from "../images/HomeD/user.png"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

function ToolDeats({ deats, handleHide }) {
    const [formData, setFormData] = useState({
        toolId: deats._id,
        duration: "",
        pickupMethod: "",
        price: 0,
        charge: 0,
        location: null,
    });

    const [currentPanel, setCurrentPanel] = useState("1st");
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);

    const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);
    const toggleDropdown2 = () => setDropdownOpen2(!dropdownOpen2);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        if (currentPanel === "1st" && formData.pickupMethod && formData.duration) {
            setCurrentPanel("2nd");
        } 
    };

    const handleRrev = () => {
        setCurrentPanel("1st");
        handleChange("charge", 0);
    }

    const handleLocationCharge = (location) => {
        const baseLocation = { latitude: 45.4215, longitude: -75.6972 };
        const R = 6371;
        const toRad = (value) => (value * Math.PI) / 180;

        const dLat = toRad(location.latitude - baseLocation.latitude);
        const dLon = toRad(location.longitude - baseLocation.longitude);

        const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(baseLocation.latitude)) * Math.cos(toRad(location.latitude)) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;
        const charge = distance * 5;
        handleChange("charge", charge.toFixed(2));
    };

    const findMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const clientLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    handleChange("location", clientLocation);
                    handleLocationCharge(clientLocation);
                },
                (error) => console.error("Error fetching location:", error)
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = () => {
        if (formData.pickupMethod === "Self Pickup") {
            handleChange("charge", 0);
            handleChange("location", "");
        }
        
        else if (formData.pickupMethod === "Home Delivery" && formData.charge === 0) {
            alert("Please select a location for delivery.");
        }
        
        console.log("Reservation Details:", formData);

/*         axios.post(baseUrl + "rents", formData)
            .then(response => console.log("Reservation successful:", response.data))
            .catch(error => console.error("Error making reservation:", error)); */
    };

    return (
        <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="d-flex justify-content-center m-5" initial={{ opacity: 0, y: -500 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -500 }} transition={{ duration: 0.25, delay: 0.25 }}>
                <Container style={{ minHeight: "50vh", backgroundColor: "white", borderRadius: "15px", padding: "40px" }}>
                    <button style={{ position: "absolute", top: "0px", right: "10px", background: "transparent", border: "none", fontSize: "40px", color: "white", cursor: "pointer" }} onClick={handleHide}>&times;</button>

                    {currentPanel === "1st" && (
                        <>
                            <Row>
                                <Col md={6} className="d-flex align-items-center justify-content-center">
                                    <CardImg src={deats.image} />
                                </Col>
                                <Col md={6} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "15px" }}>
                                    <h3>{deats.name}</h3>
                                    <p>{deats.description}</p>
                                    <Table>
                                        <thead style={{ backgroundColor: "gray" }}>
                                            <tr>
                                                <th>4 Hour</th>
                                                <th>1 Day</th>
                                                <th>1 Week</th>
                                                <th>4 Weeks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {deats.prices.map((price, index) => (
                                                    <td key={index}>{price} TK</td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <div className="d-flex mb-1">
                                        <Dropdown isOpen={dropdownOpen1} toggle={toggleDropdown1}>
                                            <DropdownToggle caret className="butt">
                                                Duration
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {["4 Hour", "1 Day", "1 Week", "4 Weeks"].map((duration, index) => (
                                                    <DropdownItem key={duration} onClick={() => {
                                                        handleChange("duration", duration);
                                                        handleChange("price", deats.prices[index]);
                                                    }}>{duration}</DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>

                                        <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2}>
                                            <DropdownToggle caret className="butt">
                                                Pickup Method
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => handleChange("pickupMethod", "Self Pickup")}>Self Pickup</DropdownItem>
                                                <DropdownItem onClick={() => handleChange("pickupMethod", "Home Delivery")}>Home Delivery</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    <div className="ml-2 mt-4 mb-2">
                                        <p className="text-muted">Duration: {formData.duration}</p>
                                        <p className="text-muted">Pick up method: {formData.pickupMethod}</p>
                                    </div>
                                    <div style={{display: "inline-block"}} className="butt" onClick={handleNext}>Request Reservation</div>
                                </Col>
                            </Row>
                        </>
                    )}

                    {currentPanel === "2nd" && (
                        <Row>
                            <Col md={6} className="d-flex align-items-center justify-content-center">
                                <CardImg src={deats.image} />
                            </Col>
                            <Col md={6}>
                                <h4 className="mb-4">Reservation Summary</h4>
                                <p>Pickup Method: {formData.pickupMethod}</p>
                                <p>Duration: {formData.duration}</p>
                                <p>Price: {formData.price} TK</p>

                                {formData.pickupMethod === "Self Pickup" ? (
                                    <>
                                        <p>Delivery Charge: $0</p>
                                        <div className="butt" style={{display: "inline-block"}} onClick={handleSubmit}>Confirm Reservation</div>
                                        <div className="butt" style={{display: "inline-block"}} onClick={handleRrev}>Go Back</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="butt" style={{display: "inline-block"}} onClick={() => {handleChange("charge", 10); handleChange("location", "Ottawa");}}>Ottawa (+$10)</div>
                                        <div className="butt" style={{display: "inline-block"}} onClick={() => {handleChange("charge", 15); handleChange("location", "Toronto");}}>Toronto (+$15)</div>
                                        <div className="butt" style={{display: "inline-block"}} onClick={() => {handleChange("charge", 20); handleChange("location", "Quebec");}}>Quebec (+$20)</div>
                                        <div style={{cursor: "pointer"}} className="mt-2 mb-2" onClick={findMyLocation}>Find My Location <CiLocationOff /></div>
                                        <p>Delivery Charge: ${formData.charge}</p>
                                        <div className="butt" style={{display: "inline-block"}} onClick={handleSubmit}>Confirm Reservation</div>
                                        <div className="butt" style={{display: "inline-block"}} onClick={handleRrev}>Go Back</div>
                                    </>
                                )}                            
                            </Col>
                        </Row>
                    )}
                </Container>
            </motion.div>
        </motion.div>
    );
}

function HomeD ({tools}) {
    const [selectedTool, setSelectedTool] = useState(null);
    
    const handleShow = (tool) => {
        setSelectedTool(tool);
    };

    const handleHide = () => {
        setSelectedTool(null);
    };

    const feats = tools.tool.map((tl, index) => {
        return (
            <>
                <SwiperSlide
                    key={index}
                    style={{
                        border: "2px solid #ccc",
                        borderRadius: "15px",
                        overflow: "hidden",
                        padding: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <CardImg src={`public/${tl.image}`}></CardImg>
                    <p className="mt-3">{tl.name}</p>
                    <div
                        className="butt"
                        onClick={() => handleShow(tl)}
                        style={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden"
                        }}
                    >
                        Check pricing & availability
                    </div>
                </SwiperSlide>
            </>
        );
    }) 

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
            {selectedTool && <ToolDeats deats={selectedTool} handleHide={handleHide} />}
          </AnimatePresence>    
        </motion.div>
    )
}

export default HomeD