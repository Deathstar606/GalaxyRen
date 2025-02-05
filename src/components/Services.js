import React, {useState} from "react";
import { Container, Row, Col, CardImg } from "reactstrap";
import { StaggeredText } from "./TextAnimate";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import pr from "../images/pantrepair.jpg"
import ef from "../images/exhaustfan.jpg"

const ServieDeatils = [
  { 
    "name": "Paint Repair", 
    "head": pr,
    "images": [pr, pr, pr],
    "description": "We offer a wide range of services to help you maintain your vehicle. From paint repair to exhaust fan installation, we have you covered. Our team of experts will work with you to find the best solution for your needs. Contact us today to learn more about our services and how we can help you."
  },
  { 
    "name": "Exhaust Fan Installation", 
    "head": ef,
    "images": [ef, ef, ef],
    "description": "at we offer a wide range of services to help you maintain your vehicle. From paint repair to exhaust fan installation, we have you covered. Our team of experts will work with you to find the best solution for your needs. Contact us today to learn more about our services and how we can help you."
  },
]

function ShowDescription ({ desp, handleHide }) {
  return (
    <>
      <motion.div
        className='modal-back'
        onClick={handleHide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className='d-flex justify-content-center'
          style={{ marginTop: "10vh" }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.2 }}
        >
          <Container style={{ position: "absolute", maxWidth: "85%" }}>
            <Row className="justify-content-center ml-1 mr-1">
              <Col md={5} className="p-4">
                <Swiper
                  autoplay={{
                    delay: 4800,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  spaceBetween={15}
                  loop={true}
                  modules={[Autoplay, Pagination]}
                  speed={2500}
                  >
                    {desp.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <CardImg src={img} style={{borderRadius: "15px"}}/>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                <h5 className="text-center mb-4 mt-4 text-white">{desp.description}</h5>
              </Col>
            </Row>
          </Container>
        </motion.div>
      </motion.div>
    </>
  );
}

function Service () {

  const [modal, setModal] = useState(null);  // Store the selected leader here

  const handleShow = (leader) => setModal(leader);  // Pass the leader object
  const handleHide = () => setModal(null);  // Reset modal state to null


  return (
    <>
    <h1 className="text-center mt-4 pt-4"><StaggeredText text={"DEMO HEADER TEXT"}/></h1>
    <p className="text-center mt-2 pb-4">View our services</p>
    <Container>
      <Row>
        {ServieDeatils.map((service, index) => (
          <>
            <Col md={6} className="py-2">
              <motion.div 
              className="d-flex justify-content-center catcard"
              initial = {{y: 50, opacity: 0}}
              transition={{duration: 1, type: "tween", ease: "easeIn"}}
              whileInView={{y: 0, opacity: 1}}
              whileHover={{scale: 1.04}}
              viewport={{ once: true }}>
                    <div>
                      <CardImg className="catimg" src={service.head}/>
                      <div className="cat-body">
                        <div className="butt" style={{fontSize: "21px"}} onClick={() => handleShow(service)}>
                          Learn More
                        </div>
                      </div>
                  </div>
              </motion.div>
              <p className="text-center pt-2">{service.name}</p>
            </Col>
            <AnimatePresence>
              {modal && (
                <ShowDescription desp={modal} handleHide={handleHide} />
              )}
            </AnimatePresence>
          </>
        ))}
      </Row>
    </Container>
    </>
  )
}

export default Service