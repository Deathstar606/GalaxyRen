import React from "react";
import img1 from "../images/HomeD/9842af14-db45-4108-b917-7c975d5e4acd.jfif";
import img2 from "../images/HomeD/28a927c1-6433-41b5-ac87-1b410060a0ff.jfif";
import img3 from "../images/HomeD/b855b8d8-bb60-4f69-8772-0f55a39951a7.jfif";
import { motion } from "framer-motion";
import { Card, CardImg, Col, Container, Row } from "react-bootstrap";
import { CardBody, CardText } from "reactstrap";

function Moto() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <motion.div
            className="m-2"
            initial={{ y: 50, opacity: 0 }}
            transition={{ duration: 1, type: "tween", ease: "easeIn" }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Card style={{ borderRadius: "20px" }}>
              <CardBody>
                <div className="d-flex justify-content-center">
                  <CardImg src={img1} />
                </div>
                <CardText className="text-center">
                  Why Choose Galaxy Home Solutions? We take pride in being a
                  trusted and reliable family-owned business, offering
                  homeowners peace of mind with every project. Our team
                  understands that time is valuable, so we take care of your
                  home improvements, repairs, and installations without the
                  stress and hassle. With professional experience and a keen eye
                  for detail, we bring expertise to every job, ensuring your
                  home is both functional and beautiful.
                </CardText>
              </CardBody>
            </Card>
          </motion.div>
        </Col>
        <Col md={4}>
          <motion.div
            className="m-2"
            initial={{ y: 50, opacity: 0 }}
            transition={{ duration: 1, type: "tween", ease: "easeIn" }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Card style={{ borderRadius: "20px" }}>
              <CardBody>
                <div className="d-flex justify-content-center">
                  <CardImg src={img2} />
                </div>
                <CardText className="text-center">
                  Quality Craftsmanship, Every Time At Galaxy Home Solutions, we
                  believe that every home deserves top-tier craftsmanship and
                  expert care. Whether it’s a small repair, a custom renovation,
                  or a complete makeover, we ensure seamless communication,
                  proper budgeting, and efficient project management. Our team
                  is committed to delivering high-quality handyman services that
                  not only meet but exceed your expectations.
                </CardText>
              </CardBody>
            </Card>
          </motion.div>
        </Col>
        <Col md={4}>
          <motion.div
            className="m-2"
            initial={{ y: 50, opacity: 0 }}
            transition={{ duration: 1, type: "tween", ease: "easeIn" }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Card style={{ borderRadius: "20px" }}>
              <CardBody>
                <div className="d-flex justify-content-center">
                  <CardImg src={img3} />
                </div>
                <CardText className="text-center">
                  Professional Service, Fair Pricing Unlike larger contractors
                  who may overlook smaller jobs, we treat every project with
                  importance, no matter the size. Whether you need repairs,
                  renovations, or routine maintenance, we offer affordable and
                  transparent pricing with no hidden costs. At Galaxy Home
                  Solutions, we believe in making high-quality home services
                  accessible, so you can enjoy a home that’s well-maintained and
                  built to last.
                </CardText>
              </CardBody>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default Moto;
