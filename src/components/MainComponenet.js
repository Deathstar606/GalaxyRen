import React, { useEffect, useRef } from 'react';
import Example from './Navbar';
import HeroSec from './HeroSec';
import Service from './Services';
import Testi from './Testimonial';
import About from './AboutUs';
import AppointmentForm from './Appointment';
import CatDeat from './CatDeats';
import Footer from './Footer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { connect } from 'react-redux';
import { fetchCases } from '../redux/ActionCreator';

const mapStateToProps = (state) => ({
  cases: state.cases,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCases: () => dispatch(fetchCases()),
});

const Home = ({ heroRef }) => (
  <motion.div
  transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
  initial = {{x: 1000, opacity: 0}}
  animate= {{x: 0, opacity: 1}}
  exit= {{x: -1000, opacity: 0}}>
    <div ref={heroRef}>
      <HeroSec />
    </div>
    <Service />
    <Testi/>
  </motion.div>
);

const Categories = () => {
  return <CatDeat />;
};

const Main = (props) => {
  const location = useLocation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { threshold: 0.1 });

  useEffect(() => {
    props.fetchCases();
  }, []);

  return (
    <div /* style={{backgroundColor: "#d8d9da"}} */>
      <Example
        className={isHeroInView ? 'nav-c' : 'nav-c-scrolled'}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/home" element={<Home heroRef={heroRef} />} />
          <Route path="/home/cat" element={<Categories />} />
          <Route path="/home/aboutus" element={<About />} />
          <Route path="/home/contactus" element={<AppointmentForm />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AnimatePresence>

      <Footer/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
