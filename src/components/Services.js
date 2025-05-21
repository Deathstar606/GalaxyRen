import React, { useRef } from "react";
import { Container, Row, Col, CardImg } from "reactstrap";
import { StaggeredText } from "./TextAnimate";
import { motion, useInView } from "framer-motion";

function ServiceCard({ service }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Col md={3} xs={6} className="m-0 g-0">
      <motion.div 
        className="d-flex flex-column align-items-center justify-content-start text-center p-3"
        style={{ minHeight: "300px", height: "100%", padding: "15px", borderRadius: "20px", backgroundColor: "#f9f9f9", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}>
          <motion.div
            ref={ref}
            className="d-flex justify-content-center w-100"
            initial={{ y: 60, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.1, rotate: 3, transition: { type: "spring", stiffness: 250 } }}
          >
            <div className="service-image-container rounded-circle overflow-hidden">
              <CardImg src={service.mainImg}/>
            </div>
          </motion.div>
          <p className="text-center pt-3" style={{ fontWeight: "bold" }}>
            {service.name}
          </p>
          <div className="text-center">{service.description}</div>
      </motion.div>
    </Col>
  );
}

function Service({ services }) {
  return (
    <>
      <h1 className="text-center mt-5 pt-4" id="serve">
        <StaggeredText text={"Our Services"} />
      </h1>
      <p className="text-center mt-2 pb-4">View our services</p>
      <Container className="mb-5">
        <Row>
          {services.services &&
            services.services.map((service, index) => (
              <ServiceCard service={service} key={index} />
            ))}
        </Row>
      </Container>
    </>
  );
}

export default Service;
