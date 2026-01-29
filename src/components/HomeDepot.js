import React, { useState } from "react";
import { CiLocationOff } from "react-icons/ci";
import {
  CardImg,
  Container,
  Row,
  Col,
  Table,
  Card,
  CardBody,
  CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { AnimatePresence, motion } from "framer-motion";
import { StaggeredText } from "./TextAnimate";

import axios from "axios";
import { baseUrl } from "../shared/baseurl";
import { generateEmailHtml } from "../emails";

import icon1 from "../images/Rent Page/age.jfif";
import icon2 from "../images/Rent Page/card.jfif";
import icon3 from "../images/Rent Page/location.jfif";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MediaQuery from "react-responsive";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPanel, setCurrentPanel] = useState("1st");
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);
  const toggleDropdown2 = () => setDropdownOpen2(!dropdownOpen2);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentPanel === "1st" && formData.pickupMethod && formData.duration) {
      setCurrentPanel("2nd");
    } else {
      alert("Please select both duration and pickup method to proceed.");
    }
  };

  const handleRrev = () => {
    setCurrentPanel("1st");
    handleChange("charge", 0);
  };

  const handleLocationCharge = (location) => {
    const baseLocation = { latitude: 45.4215, longitude: -75.6972 };
    const R = 6371;
    const toRad = (value) => (value * Math.PI) / 180;

    const dLat = toRad(location.latitude - baseLocation.latitude);
    const dLon = toRad(location.longitude - baseLocation.longitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(baseLocation.latitude)) *
        Math.cos(toRad(location.latitude)) *
        Math.sin(dLon / 2) ** 2;
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
        (error) => console.error("Error fetching location:", error),
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = () => {
    const { name, phone, email, duration, pickupMethod } = formData;

    // 🔴 Basic validation
    if (!name || !phone || !email || !duration || !pickupMethod) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    if (pickupMethod === "Home Delivery" && formData.charge === 0) {
      alert("Please select a location for delivery.");
      return;
    }

    const updatedFormData = {
      ...formData,
      charge: pickupMethod === "Self Pickup" ? 0 : formData.charge,
      location: pickupMethod === "Self Pickup" ? "" : formData.location,
    };

    // 🟡 Inform user that submission has started
    setIsSubmitting(true);
    alert("Please wait while your reservation is being processed...");

    axios
      .post(baseUrl + "rents", updatedFormData)
      .then((response) => {
        console.log("Reservation successful:", response.data);

        const emailHtml = generateEmailHtml(
          updatedFormData.name,
          "this is a test message",
          "",
        );

        return axios.post(baseUrl + "mail", {
          subject: "this is a test",
          htmlContent: emailHtml,
          email: updatedFormData.email,
          message: `A reservation for ${deats.name} has been confirmed. The requested duration is ${updatedFormData.duration}.`,
        });
      })
      .then(() => {
        alert("✅ Reservation complete! A confirmation email has been sent.");
      })
      .catch((error) => {
        console.error("Error processing request:", error);
        alert("❌ Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    console.log("Reservation Details:", updatedFormData);
  };
  return (
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
        <Container className="homed_modal_container">
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

          {currentPanel === "1st" && (
            <>
              <Row>
                <Col
                  md={6}
                  xs={12}
                  className="d-flex align-items-center justify-content-center mb-3"
                >
                  <CardImg
                    style={{
                      width: "100%",
                      height: "50vh",
                      objectFit: "contain",
                    }}
                    src={baseUrl + deats.image}
                  />
                </Col>
                <Col
                  md={6}
                  xs={12}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <h3>{deats.name}</h3>
                  <p>{deats.description}</p>
                  <div
                    style={{
                      overflowX: "auto",
                      whiteSpace: "nowrap",
                      scrollbarWidth: "none",
                    }}
                  >
                    <Table>
                      <thead
                        style={{ backgroundColor: "#00084c", color: "#ffffff" }}
                      >
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
                  </div>
                  <div className="mb-1 button_container">
                    <Dropdown isOpen={dropdownOpen1} toggle={toggleDropdown1}>
                      <DropdownToggle caret className="butt">
                        Duration
                      </DropdownToggle>
                      <DropdownMenu>
                        {["4 Hour", "1 Day", "1 Week", "4 Weeks"].map(
                          (duration, index) => (
                            <DropdownItem
                              key={duration}
                              onClick={() => {
                                handleChange("duration", duration);
                                handleChange("price", deats.prices[index]);
                              }}
                            >
                              {duration}
                            </DropdownItem>
                          ),
                        )}
                      </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2}>
                      <DropdownToggle caret className="butt">
                        Pickup Method
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() =>
                            handleChange("pickupMethod", "Self Pickup")
                          }
                        >
                          Self Pickup
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleChange("pickupMethod", "Home Delivery")
                          }
                        >
                          Home Delivery
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="ml-2 mt-4 mb-2">
                    <p className="text-muted">Duration: {formData.duration}</p>
                    <p className="text-muted">
                      Pick up method: {formData.pickupMethod}
                    </p>
                  </div>
                  <div
                    style={{ display: "inline-block" }}
                    className="butt"
                    onClick={handleNext}
                  >
                    Request Reservation
                  </div>
                </Col>
              </Row>
            </>
          )}

          {currentPanel === "2nd" && (
            <Row>
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center mb-3"
              >
                <CardImg src={baseUrl + deats.image} />
              </Col>
              <Col md={6}>
                <h4 className="mb-4">Reservation Summary</h4>
                <p>Pickup Method: {formData.pickupMethod}</p>
                <p>Duration: {formData.duration}</p>
                <p>Price: {formData.price} TK</p>

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
                    <div
                      className="butt"
                      style={{ display: "inline-block" }}
                      onClick={handleSubmit}
                    >
                      Confirm Reservation
                    </div>
                    <div
                      className="butt"
                      style={{ display: "inline-block" }}
                      onClick={handleRrev}
                    >
                      Go Back
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="butt"
                      style={{ display: "inline-block" }}
                      onClick={() => {
                        handleChange("charge", 10);
                        handleChange("location", "Ottawa");
                      }}
                    >
                      Ottawa (+$10)
                    </div>
                    <div
                      className="butt"
                      style={{ display: "inline-block" }}
                      onClick={() => {
                        handleChange("charge", 15);
                        handleChange("location", "Toronto");
                      }}
                    >
                      Toronto (+$15)
                    </div>
                    <div
                      className="butt"
                      style={{ display: "inline-block" }}
                      onClick={() => {
                        handleChange("charge", 20);
                        handleChange("location", "Quebec");
                      }}
                    >
                      Quebec (+$20)
                    </div>
                    <div
                      style={{ cursor: "pointer", display: "inline-block" }}
                      className="mt-2 mb-2 butt"
                      onClick={findMyLocation}
                    >
                      Find My Location <CiLocationOff />
                    </div>
                    <p>Delivery Charge: ${formData.charge}</p>
                    <div
                      className="butt"
                      style={{
                        display: "inline-block",
                        opacity: isSubmitting ? 0.6 : 1,
                        pointerEvents: isSubmitting ? "none" : "auto",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                      }}
                      onClick={!isSubmitting ? handleSubmit : undefined}
                    >
                      {isSubmitting ? "Submitting..." : "Confirm Reservation"}
                    </div>
                    <div
                      className="butt"
                      style={{ display: "inline-block" }}
                      onClick={handleRrev}
                    >
                      Go Back
                    </div>
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

function HomeD({ tools }) {
  const [selectedTool, setSelectedTool] = useState(null);

  const handleShow = (tool) => {
    setSelectedTool(tool);
  };

  const handleHide = () => {
    setSelectedTool(null);
  };

  return (
    <motion.div
      className="pb-5"
      transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
    >
      <h1 className="text-center mt-5 mb-2">
        <StaggeredText text={"Tool Rental"} />
      </h1>
      <h6 className="text-center pb-4 mb-4">Sub Heading for Tool Rental</h6>
      <Container className="tool_container">
        <MediaQuery minWidth={640}>
          <Row
            className="pt-4 mt-4"
            style={{ justifyContent: "center", margin: "0" }}
          >
            <Col md={4} xs={6}>
              <div className="d-flex justify-content-center">
                <CardImg src={icon3} style={{ width: "65%" }}></CardImg>
              </div>
              <p className="text-center m-0">
                Rentals must be returned to the same location
              </p>
            </Col>
            <Col md={4} xs={6}>
              <div className="d-flex justify-content-center">
                <CardImg src={icon2} style={{ width: "65%" }}></CardImg>
              </div>
              <p className="text-center m-0">
                Have a valid credit card for the a deposit at the time of
                pick-up
              </p>
            </Col>
            <Col md={4} xs={6}>
              <div className="d-flex justify-content-center">
                <CardImg src={icon1} style={{ width: "65%" }}></CardImg>
              </div>
              <p className="text-center m-0">Must be at least 18 years old</p>
              <p className="text-center m-0 pt-2">
                Have a government-issued photo ID that is valid at the time of
                rental
              </p>
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery maxWidth={640}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            <SwiperSlide className="p-2">
              <CardImg src={icon3} alt="Rental return policy" />
              <p className="mt-2 text-center">
                Rentals must be returned to the same location
              </p>
            </SwiperSlide>
            <SwiperSlide className="p-2">
              <CardImg src={icon2} alt="Credit card requirement" />
              <p className="mt-2 text-center">
                Have a valid credit card for a deposit at the time of pick-up
              </p>
            </SwiperSlide>
            <SwiperSlide className="p-2">
              <CardImg src={icon1} alt="Age and ID requirement" />
              <p className="mt-2 text-center">Must be at least 18 years old</p>
              <p className="mt-1 text-center">
                Have a government-issued photo ID that is valid at the time of
                rental
              </p>
            </SwiperSlide>
          </Swiper>
        </MediaQuery>
        <h1 className="p-5 text-center">Rent the product</h1>
        <Row className="g-1" style={{ justifyContent: "center", margin: "0" }}>
          {tools.tool.map((tl, index) => (
            <Col
              md={3}
              xs={12}
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2.5px",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }} // Scales the card a little on hover
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  width: "100%", // Full width within Col
                  borderRadius: "15px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Card style={{ width: "100%" }}>
                  <CardImg
                    top
                    src={baseUrl + tl.image}
                    alt={tl.name}
                    style={{
                      borderRadius: "15px 15px 0 0",
                      margin: "10px",
                      objectFit: "contain",
                      height: "200px",
                    }}
                  />
                  <CardBody
                    className="home-butt"
                    style={{ backgroundColor: "#00084c" }}
                  >
                    <CardText className="text-center text-white p-2">
                      {tl.name}
                    </CardText>
                    <div
                      className="butt text-center"
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                      onClick={() => handleShow(tl)}
                    >
                      Check Pricing & Availability
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      <AnimatePresence>
        {selectedTool && (
          <ToolDeats deats={selectedTool} handleHide={handleHide} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default HomeD;
