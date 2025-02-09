import React, { useEffect, useRef } from 'react';
import Example from './Navbar';
import HeroSec from './HeroSec';
import Service from './Services';
import Testi from './Testimonial';
import HomeD from './HomeDepot';
import About from './AboutUs';
import TestAnimation from './HeroSec';
import AppointmentForm from './Appointment';
import Estimation from './Estimation';
import CatDeat from './CatDeats';
import SubCat from './CategoryWSub';
import Footer from './Footer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { fetchCases } from '../redux/ActionCreator';

const mapStateToProps = (state) => ({
  cases: state.cases,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCases: () => dispatch(fetchCases()),
});

const Home = () => (
  <motion.div
  style={{backgroundColor: "#ffffff"}}
  transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
  initial = {{x: 1000, opacity: 0}}
  animate= {{x: 0, opacity: 1}}
  exit= {{x: -1000, opacity: 0}}>
    <HeroSec />
    <Service />
    <Estimation/>
    <Testi/>
  </motion.div>
);

const Categories = () => {
  return <CatDeat />;
};

const CategoriesWsub = () => {
  return <SubCat />;
};

const Main = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.fetchCases();
  }, []);

  return (
    <div>
      <Example/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/homed" element={<HomeD />} />
          <Route path="/home/cat" element={<Categories />} />
          <Route path="/home/subcat" element={<CategoriesWsub />} />
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
