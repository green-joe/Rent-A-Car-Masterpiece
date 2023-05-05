import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Breadcrumb, BreadcrumbItem, Button } from 'react-bootstrap'
import { CardBody, CardImg, ListGroup, ListGroupItem, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getIsLogged } from '../services/IsLogged';





const UserProfilePage = () => {
  const redirect = useNavigate();
  const location = useLocation();
  const email = location.state  
  const [customer, setCustomer] = useState({})



  

  fetch(`http://localhost:8080/customer/get/byEmail?email=${email}`, {
  }).then(response => response.json())
    .then(data => setCustomer({id:data.id,
      email:data.email,
      firstName:data.firstName,
      lastName:data.lastName,
      phoneNumber:data.phoneNumber,
      address:data.address }))
    .catch(error => console.error(error + "err"));
    
    
  
  localStorage.setItem('customer',JSON.stringify(customer))
 


  function handleInputChange(event) {
    const { name, value } = event.target;
    //setUserProfile({ ...userProfile, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();


    getIsLogged().then(response => {
      if (response.ok) {
        console.log("Logged out successfully");
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('customer')
        
        redirect("/home");
        window.dispatchEvent(new Event('storage'))


      } else {
        console.log("Failed to log out");
      }
    })
      .catch(error => {
        console.error(error);
      });


  }
  useEffect(() => {  
  

    window.dispatchEvent(new Event('storage'))
  }, []);



  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container className="py-5">
        <Row>
          <Col >
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
            <Card className="mb-4 " style={{height:'100%'}}>
              <CardBody className="text-center">
                <CardImg
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />

                <p className="text-muted mb-4">{customer.firstName}</p>
                {/* <div className="d-flex justify-content-center mb-2">                  
                  <Button outline className="ms-1">Message</Button>
                </div> */}
              </CardBody>
            </Card>
            </Col>
            <Col lg="3">
            <Card className="mb-4 mb-lg-0" style={{height:'100%'}}>
              <CardBody className="p-0">
                <ListGroup flush className="rounded-3">
                  <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i className="ri-global-line" style={{ color: "#f9a826", fontSize: "24px" }}></i>

                    <CardText>https://exmple.com</CardText>
                  </ListGroupItem>

                  <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i className="ri-twitter-line" style={{ color: '#55acee', fontSize: "24px" }} />
                    <CardText>Twitter account</CardText>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i className="ri-instagram-fill" style={{ color: '#ac2bac', fontSize: "24px" }} />
                    <CardText>Instagram account</CardText>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <i className="ri-facebook-line" style={{ color: '#3b5998', fontSize: "24px" }} />
                    <CardText>Facebook account</CardText>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5">
            <Card className="mb-4" style={{height:'100%'}}>
              <CardBody>
                <Row>
                  <Col sm="3">
                    <CardText>Full Name</CardText>
                  </Col>
                  <Col sm="9">
                    <CardText className="text-muted">{customer.firstName}{" "}{customer.lastName}</CardText>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <CardText>Email</CardText>
                  </Col>
                  <Col sm="9">
                    <CardText className="text-muted">{customer.email}</CardText>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <CardText>Phone</CardText>
                  </Col>
                  <Col sm="9">
                    <CardText className="text-muted">{customer.phoneNumber}</CardText>
                  </Col>
                </Row>
                <hr />
                
                <Row>
                  <Col sm="3">
                    <CardText>Address</CardText>
                  </Col>
                  <Col sm="9">
                    <CardText className="text-muted">{customer.address}</CardText>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            </Col>
            <Col>
            <div className="d-grid" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'10%'}}>
              <Button variant="primary" type="submit" onClick={handleSubmit}>Logout</Button>

              {/* { localStorage.setItem('isLoggedIn',false)} */}


              {/* {popupMessage === 'error' && (
                        showPopup && <Popup message={popupErrorMessage} onClose={handleClosePopup} />
                      )} */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserProfilePage;