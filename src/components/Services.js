import React from "react";
import { Container, Row, Col, CardImg } from "reactstrap";
import { StaggeredText } from "./TextAnimate";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import pr from "../images/pantrepair.jpg"
import ef from "../images/exhaustfan.jpg"

function Service () {
  return (
    <>
    <h1 className="text-center mt-4 pt-4"><StaggeredText text={"DEMO HEADER TEXT"}/></h1>
    <p className="text-center mt-2 pb-4">View our services</p>
    <Container>
      <Row>
        <Col md={6} className="py-2">
          <motion.div 
          className="d-flex justify-content-center catcard"
          initial = {{y: 50, opacity: 0}}
          transition={{duration: 1, type: "tween", ease: "easeIn"}}
          whileInView={{y: 0, opacity: 1}}
          whileHover={{scale: 1.04}}
          viewport={{ once: true }}>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to= "/home/cat">
                <div>
                  <CardImg className="catimg" src={pr}/>
                  <div className="cat-body">
                    <div className="butt" style={{fontSize: "21px"}} /* onClick={handleClick} */>
                      Learn More
                    </div>
                  </div>
              </div>
            </Link>
          </motion.div>
          <p className="text-center pt-2">Paint Repair</p>
        </Col>
        <Col md={6} className="py-2">
          <motion.div 
          className="d-flex justify-content-center catcard"
          initial = {{y: 50, opacity: 0}}
          transition={{duration: 1, type: "tween", ease: "easeIn"}}
          whileInView={{y: 0, opacity: 1}}
          whileHover={{scale: 1.04}}
          viewport={{ once: true }}>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to= "/">
                <div>
                  <CardImg className="catimg" src={ef}/>
                  <div className="cat-body">
                    <div className="butt" style={{fontSize: "21px"}} /* onClick={handleClick} */>
                      Learn More
                    </div>
                  </div>
              </div>
            </Link>
          </motion.div>
          <p className="text-center pt-2">Exhaust Fan Installation</p>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Service