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
import { generateEmailHtml } from "../emails";

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
        name: "",
        phone: "",
        email: "",
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
        if (formData.pickupMethod === "Home Delivery" && formData.charge === 0) {
            alert("Please select a location for delivery.");
            return;
        }
    
        const updatedFormData = { 
            ...formData, 
            charge: formData.pickupMethod === "Self Pickup" ? 0 : formData.charge, 
            location: formData.pickupMethod === "Self Pickup" ? "" : formData.location 
        };
    
        axios.post(baseUrl + "rents", updatedFormData)
            .then(response => {
                console.log("Reservation successful:", response.data);
    
                // Generate email content
                const emailHtml = generateEmailHtml(
                    updatedFormData.name,
                    "this is a test message",
                    "data:image/jpeg;base64,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"
                );
                // Send email
                return axios.post(baseUrl + "mail", {
                    subject: "this is a test",
                    htmlContent: emailHtml,
                    email: updatedFormData.email,
                    message: `A reservation for ${deats.name} has been confirmed. The requested duration is ${updatedFormData.duration}.`
                });
            })
            .then(emailResponse => {
                console.log("Email sent successfully:", emailResponse.data);
            })
            .catch(error => {
                console.error("Error processing request:", error);
            });
    
        console.log("Reservation Details:", updatedFormData);
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
                                    <CardImg src={baseUrl + deats.image} />
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
                                <CardImg src={baseUrl + deats.image} />
                            </Col>
                            <Col md={6}>
                                <h4 className="mb-4">Reservation Summary</h4>
                                <p>Pickup Method: {formData.pickupMethod}</p>
                                <p>Duration: {formData.duration}</p>
                                <p>Price: {formData.price} TK</p>

                                {/* Name & Phone Number Fields (Side by Side) */}
                                <Row className="mb-2">
                                    <Col>
                                        <input 
                                            type="text" 
                                            placeholder="Enter Name" 
                                            className="form-control"
                                            value={formData.name || ""}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <input 
                                            type="text" 
                                            placeholder="Enter Phone Number" 
                                            className="form-control"
                                            value={formData.phone || ""}
                                            onChange={(e) => handleChange("phone", e.target.value)}
                                        />
                                    </Col>
                                </Row>

                                {/* Email Field (Below Name & Phone) */}
                                <Row className="mb-3">
                                    <Col>
                                        <input 
                                            type="email" 
                                            placeholder="Enter Email" 
                                            className="form-control"
                                            value={formData.email || ""}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                        />
                                    </Col>
                                </Row>

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
                    <CardImg src={baseUrl + tl.image}></CardImg>
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