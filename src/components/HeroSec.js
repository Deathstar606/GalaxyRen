import React, { useState } from "react";
import { StaggeredText } from "./TextAnimate";
import demo1 from "../images/Hero Slider/1000_F_588238455_Q6IkVMMaomoWuD66ijiY2sgDPCi2cpPl.jpg";
import demo2 from "../images/Hero Slider/1695810787-img2-banner-blog-1a.jpg";
import demo3 from "../images/Hero Slider/Feature-How-to-plan-a-house-renovation.jpg";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import MediaQuery from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

const backgrounds = ["green", "lightblue", "orange"];
const texts = ["hello", "good bye", "see you later"];
const images = [demo1, demo2, demo3];

const HeroSec = () => {
  const [index, setIndex] = useState(0);
  const [style, setStyle] = useState({ transform: "translate(0, 0)" });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;

    setStyle({ transform: `translate(${x}px, ${y}px)` });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: "translate(0, 0)", transition: "transform 0.2s ease" });
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length);
  };

  return (
    <Container fluid>
      <MediaQuery maxWidth={639}>
        <Row style={{ minHeight: "100vh" }}>
          <Col md={6} xs={12} className="p-0 home-butt" style={{ position: "relative", backgroundColor: "#00084c" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  padding: "20vh 5vh",
                  position: "relative",
                  minHeight: "50vh", 
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    ...style,
                    paddingLeft: "10px",
                    transition: "transform 0.1s ease",
                    color: "#fff",
                  }}
                >
                  Big Heading
                </motion.h1>
                <motion.p
                  className="text-white"
                  style={{
                    ...style,
                    paddingLeft: "10px",
                    transition: "transform 0.1s ease",
                  }}
                >
                  <StaggeredText key={texts[index]} text={texts[index]} />
                </motion.p>
                <div className="mt-3 butt" style={{ display: "inline-block" }}>
                  Hello
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: "10px",
                bottom: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaRegArrowAltCircleLeft color="#ffffff" size={30} />
            </button>
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaRegArrowAltCircleRight color="#ffffff" size={30} />
            </button>
          </Col>

          <Col
            md={6}
            xs={12}
            className="p-0 d-flex justify-content-center align-items-center"
            style={{ position: "relative", minHeight: "50vh" }}
          >
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0 0 30px 30px",
                backgroundImage: `url(${images[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Col>
        </Row>
      </MediaQuery>
      <MediaQuery minWidth={640}>
      <Row style={{backgroundColor: "#00084c"}}>
        <Col md={6} xs={12} className="p-0 home-butt" style={{display: "inline-block"}}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index} // Ensures re-render for smooth animation
              initial={{ opacity: 0 }}
              animate={{ opacity: 1}}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                paddingTop: "30vh",  // Top padding of 30vh
                paddingLeft: "20vh", // Left padding of 20px
                position: "relative",
                height: "100vh",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  ...style,
                  paddingLeft: "10px",
                  transition: "transform 0.1s ease",
                  color: "#fff",
                }}
              >
                Big Heading
              </motion.h1>
              <motion.p
                className="text-white"
                style={{
                  ...style,
                  paddingLeft: "10px",
                  transition: "transform 0.1s ease",
                }}
              >
                <StaggeredText key={texts[index]} text={texts[index]} />
              </motion.p>
              <div className="mt-3 butt" style={{ display: "inline-block" }}>
                Hello
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaRegArrowAltCircleLeft color="#ffffff" size={30} />
          </button>
        </Col>
        <Col md={6} xs={12} style={{position: "relative"}} className="p-0 d-flex justify-content-center align-items-center">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              borderRadius: "0px 0 30px 30px",
              top: "0%",
              width: "100%",
              height: "90%",
              backgroundImage: `url(${images[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaRegArrowAltCircleRight color="#ffffff" size={30} />
          </button>
        </Col>
      </Row>
      </MediaQuery>
    </Container>
  );
};

export default HeroSec;
