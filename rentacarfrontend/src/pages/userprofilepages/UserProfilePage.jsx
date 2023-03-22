import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card,Breadcrumb,BreadcrumbItem, Button, ProgressBar } from 'react-bootstrap'
import { CardBody, CardImg, ListGroup,ListGroupItem, CardText,Progress} from 'reactstrap';
import {Link} from 'react-router-dom'
import Helmet from "../../components/Helmet/Helmet";
import LoginPage from '../LoginPage';
import Banner from './Banner';


const UserProfilePage = () => {
  const location = useLocation();
  const email = location.state
  const userProfile =  fetch("http://localhost:8080/customer/get/customer", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
    });
  console.log(userProfile.json())
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can send the userProfile object to a backend or do something else with the data
   
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
       <Container className="py-5">
        <Row>
          <Col>
            <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
              <BreadcrumbItem>
                <Link to={"/"}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href="#">User</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>User Profile</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <CardBody className="text-center">
                <CardImg
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                
                <p className="text-muted mb-4">{userProfile.name}</p>
                <div className="d-flex justify-content-center mb-2">                  
                  <Button outline className="ms-1">Message</Button>
                </div>
              </CardBody>
            </Card>
            <Card className="mb-4 mb-lg-0">
              <CardBody className="p-0">
                <ListGroup flush className="rounded-3">
                  <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i class="ri-global-line" style={ {color: "#f9a826", fontSize:"24px"} }></i>          
                    
                    <CardText>https://mdbootstrap.com</CardText>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i class="github fa-lg" style={{ color: '#333333' }} />
                    <CardText>mdbootstrap</CardText>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <icon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <CardText>@mdbootstrap</CardText>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <icon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <CardText>mdbootstrap</CardText>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <icon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <CardText>mdbootstrap</CardText>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
            </Col>
            <Col lg="8">
            <Card className="mb-4">
              <CardBody>
                <Row>
                  <Col sm="3">
                    <CardText>Full Name</CardText>
                  </Col>
                  <Col sm="9">
                    <CardText className="text-muted">Johnatan Smith</CardText>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <CardText>Email</CardText>
                  </Col>
                  <Col sm="9">
                    <CardText className="text-muted">{userProfile.email}</CardText>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <CardText>Phone</CardText>
                  </Col>
                  <Col sm="9">
                    <CardText className="text-muted">(097) 234-5678</CardText>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <CardText>Mobile</CardText>
                  </Col>
                  <Col sm="9">
                    <CardText className="text-muted">(098) 765-4321</CardText>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <CardText>Address</CardText>
                  </Col>
                  <Col sm="9">
                    <CardText className="text-muted">Bay Area, San Francisco, CA</CardText>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Row>
              <Col md="6">
                <Card className="mb-4 mb-md-0">
                  <CardBody>
                    <CardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</CardText>
                    <CardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={80} valuemin={0} valuemax={100} />
                    </Progress>

                    <CardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={72} valuemin={0} valuemax={100} />
                    </Progress>

                    <CardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={89} valuemin={0} valuemax={100} />
                    </Progress>

                    <CardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={55} valuemin={0} valuemax={100} />
                    </Progress>

                    <CardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={66} valuemin={0} valuemax={100} />
                    </Progress>
                  </CardBody>
                </Card>
              </Col>

              <Col md="6">
                <Card className="mb-4 mb-md-0">
                  <CardBody>
                    <CardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</CardText>
                    <CardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={80} valuemin={0} valuemax={100} />
                    </Progress>

                    <CardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={72} valuemin={0} valuemax={100} />
                    </Progress>

                    <CardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={89} valuemin={0} valuemax={100} />
                    </Progress>

                    <CardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={55} valuemin={0} valuemax={100} />
                    </Progress>

                    <CardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</CardText>
                    <Progress className="rounded">
                      <ProgressBar width={66} valuemin={0} valuemax={100} />
                    </Progress>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            </Col>
            </Row>
        </Container>
    {/* <div>
      <h1>Welcome {customer.name}!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={userProfile.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={userProfile.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Bio:
          <textarea name="bio" value={userProfile.bio} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="location" value={userProfile.location} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div> */}
    </section>
  );
};

export default UserProfilePage;


// const UserProfilePage = (user) => {  
  
//   const handleLogout = () => {
//     // TODO: Implement logout logic
//     setIsLoggedIn(false);
//   };

//   return (
//     <Helmet title={user.name}>
//       <Banner/>
//     {/* <div className='vh-100' style={{ backgroundColor: "#f9a826" }}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col md="9" lg="7" xl="8" className="mt-5">
//             <Card style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
//               <CardBody className="p-4 text-black">
//                 <div>
//                   <h1>Profile Page</h1>
//                   <h6 className='display-5'>My name is</h6>
//                   <div className="d-flex align-items-center justify-content-between mb-3">
//                     <p className="small mb-0"><i
//                       className="ri-roadster-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>3 hrs</p>
//                     <p className="fw-bold mb-0">$90</p>
//                   </div>
//                 </div>               
              
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div> */}
//     </Helmet>
//   );

// }

