import React, { useEffect } from 'react';
import Example from './Navbar';
import HeroSec from './HeroSec';
import Service from './Services';
import Testi from './Testimonial';
import HomeD from './HomeDepot';
import About from './AboutUs';
import AppointmentForm from './Appointment';
import Estimation from './Estimation';
import CatDeat from './CatDeats';
import SubCat from './CategoryWSub';
import Admin from './Admin';
import Footer from './Footer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { fetcTools, fetchContacts, loginUser, logoutUser } from '../redux/ActionCreator';

const mapStateToProps = (state) => ({
  tools: state.tools,
  contacts: state.contacts,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  fetcTools: () => dispatch(fetcTools()),
  fetchContacts: () => dispatch(fetchContacts()),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
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
    props.fetcTools();
    props.fetchContacts();
  }, []);

  return (
    <div>
      <Example/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/homed" element={<HomeD tools={props.tools}/>} />
          <Route path="/home/cat" element={<Categories />} />
          <Route path="/home/subcat" element={<CategoriesWsub />} />
          <Route path="/home/aboutus" element={<About />} />
          <Route path="/home/contactus" element={<AppointmentForm />} />
          <Route path="/home/admin" element={<Admin auth={props.auth} tools={props.tools} contacts={props.contacts} loginUser={props.loginUser} logoutUser={props.logoutUser} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AnimatePresence>
      <Footer/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
