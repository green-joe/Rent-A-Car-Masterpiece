import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css"

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const customerJson = sessionStorage.getItem('customer');
const customer = useState(JSON.parse(customerJson));

//const lastName = customer.lastName;
//console.log(lastName); // will log "akaármi"
  
 
 
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  useEffect(() => {
 console.log(...customer)
    if (customerJson != null) {
      setIsLoggedIn(true);     
     
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  console.log(isLoggedIn)
  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i> +36-1-555-123
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {isLoggedIn ? (
                  <Link to="/userprofile" className="d-flex align-items-center gap-1">
                    <i class="ri-user-line"></i> {{...customer}.lastName}
                  </Link>
                ) : (
                  <Link to="/login" className=" d-flex align-items-center gap-1">
                    <i class="ri-login-circle-line"></i> Login
                  </Link >
                )}

                <Link to="/registration" className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Register
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="4" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" header__location d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                      Rent Car <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="5" md="4" sm="4">
              <div className="header__location d-flex align-items-center gap-3">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>11 Don't Looking For It street</h4>
                  <h6>Debrecen</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="4" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Monday to Friday</h4>
                  <h6>8am - 5pm</h6>
                </div>
              </div>
            </Col>


          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;