import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import Helmet from "../userprofilepages/UserProfilePage";
import LoginPage from '../LoginPage';


const UserProfilePage = (user) => {  
  
  const handleLogout = () => {
    // TODO: Implement logout logic
    setIsLoggedIn(false);
  };

  return (
    <Helmet title={user.name}>
    <div className='vh-100' style={{ backgroundColor: "#f9a826" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="8" className="mt-5">
            <Card style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
              <CardBody className="p-4 text-black">
                <div>
                  <h1>Profile Page</h1>
                  <h6 className='display-5'>My name is</h6>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="small mb-0"><i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>3 hrs</p>
                    <p className="fw-bold mb-0">$90</p>
                  </div>
                </div>               
              
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </Helmet>
  );

}

export default UserProfilePage;