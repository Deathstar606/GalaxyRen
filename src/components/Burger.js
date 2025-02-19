import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import './Burger.css';

const BurgerMenu = ({scrollFunc}) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

const [activeLink, setActiveLink] = useState('');

useEffect(() => {
  setActiveLink(location.pathname);
}, [location]);

const handleNavLinkClick = (to) => {
  window.scrollBy({
    top: window.innerHeight, 
    behavior: 'smooth', 
  });

  setTimeout(() => {
    setActiveLink(to);
  }, 500); 
};

  return (
    <div>
      <div className="burger-menu">
        <div className="burger-icon" style={{position: "fixed", right: 20, top: 40, zIndex: 1001}} onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <div className='d-flex justify-content-center p-1'>
            <li>
              <NavLink
                to="/home/contactus"
                activeClassName="active"
                onClick={() => {handleNavLinkClick('/home/contactus'); toggleMenu()}} // Update active link on click
              >
                <div className={`burg-menu pr-2 pl-2 ${activeLink === '/home/contactus' ? 'active' : ''}`}>
                  Contact Us
                </div>
              </NavLink>
            </li>
          </div>
          <div className='d-flex justify-content-center'>
            <li>
              <div
                onClick={() => {scrollFunc('freest'); toggleMenu()}} 
              >
                <div className="burg-menu pr-2 pl-2">
                  Free Estimation
                </div>
              </div>
            </li>
          </div>
          <div className='d-flex justify-content-center'>
            <li>
              <NavLink
                to="/home/homed"
                activeClassName="active"
                onClick={() => {handleNavLinkClick('/home/homed'); toggleMenu()}} // Update active link on click
              >
                <div className={`burg-menu pr-2 pl-2 ${activeLink === '/home/homed' ? 'active' : ''}`}>
                  Rent Tool
                </div>
              </NavLink>
            </li>
          </div>
          <div className='d-flex justify-content-center'>
            <li>
              <NavLink
                to="/home/aboutus"
                activeClassName="active"
                onClick={() => {handleNavLinkClick('/home/aboutus'); toggleMenu()}} // Update active link on click
              >
                <div className={`burg-menu pr-2 pl-2 ${activeLink === '/home/aboutus' ? 'active' : ''}`}>
                  About us
                </div>
              </NavLink>
            </li>
          </div>
          <div className='d-flex justify-content-center'>
            <li>
              <div
                  onClick={() => {scrollFunc('serve'); toggleMenu()}} 
                >
                <div className="burg-menu pr-2 pl-2">
                  Services
                </div>
              </div>
            </li>
          </div>
          <li className='d-flex justify-content-center pt-4'>
            <div>
              <FaFacebook color="#00084c" size={40} className='mr-3'/>
              <FaWhatsapp color="#00084c" size={40} className='mr-3'/>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
