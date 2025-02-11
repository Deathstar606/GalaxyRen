import React, {useState, useEffect} from 'react';
import {
  Navbar as BootstrapNavbar,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from "../images/GALAXY_WEBSITE_Transparent.svg";
import Burger from './Burger';
import MediaQuery from 'react-responsive';

const Navbar = () => {

  const navigate = useNavigate(); // Replaces useHistory
  const location = useLocation();
  const [scrollTarget, setScrollTarget] = useState(null);

  useEffect(() => {
    if (location.pathname === "/home" && scrollTarget) {
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          const offset = 100; // Set your desired offset here
          const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get element position
          const offsetPosition = elementPosition - offset; // Adjust for offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 500); // Delay for navigation to complete
    }
  }, [location, scrollTarget]); // Dependency on location and scrollTarget

  return (
    <Container>
      <div className="nav-c">
        <BootstrapNavbar light expand="md">
          <NavbarBrand href="/"><img className='logo' src={logo}/></NavbarBrand>
          <MediaQuery maxWidth={639}>
            <Burger />
          </MediaQuery>
          <MediaQuery minWidth={640}>
            <Nav className="ml-auto">
              <NavItem className='nav-ele'>
                <Link
                  style={{ color: "black", fontSize: "18px", fontWeight: "500", textDecoration: "none" }}
                  to="/home/contactus"
                >
                  Contact Us
                </Link>
              </NavItem>
              <NavItem className='nav-ele'>
                <Link
                  style={{ color: "black", fontSize: "18px", fontWeight: "500", textDecoration: "none" }}
                  to="/home/contactus"
                >
                  Free Estimation
                </Link>
              </NavItem>
              <NavItem className='nav-ele'>
                <Link
                  style={{ color: "black", fontSize: "18px", fontWeight: "500", textDecoration: "none" }}
                  to="/home/homed"
                >
                  Rent Tool
                </Link>
              </NavItem>
              <NavItem className='nav-ele'>
                <Link
                  style={{ color: "black", fontSize: "18px", fontWeight: "500", textDecoration: "none" }}
                  to="/home/aboutus"
                >
                  About Us
                </Link>
              </NavItem>
              <NavItem className='nav-ele'>
                <div style={{ color: "black", fontSize: "18px", fontWeight: "500", cursor: "pointer" }}>Services</div>
                <ul className='nav-sub' style={{ listStyleType: 'none', cursor: "pointer" }}>
                  <li className='ml-2'><Link to="/home/cat">Paint Repair</Link></li>
                  <li className='ml-2'><Link to="/home/subcat">Bathroom</Link></li>
                  <li className='ml-2'>Exhaust Fan</li>
                </ul>
              </NavItem>
            </Nav>
          </MediaQuery>
        </BootstrapNavbar>
      </div>
    </Container>
  );
}

export default Navbar;