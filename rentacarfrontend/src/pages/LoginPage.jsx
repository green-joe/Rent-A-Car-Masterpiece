import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import { Col, Container, FormGroup, Row, Card, Button, FormControl } from 'react-bootstrap';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import "./../styles/login-page.css"




const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with email and password, such as login with a server API
  };

  return (
    
      <Row className="p-4 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
         
          <Card className="shadow">
          <div className="square border border-3 border-primary">
            <Card.Body>
               
              <div className='mb-3 mt-md-4'>
                <h1 className="fw-bold mb-2 text-center ">Login</h1>
                <p className='mb-3 text-center'>Please enter your login and password!</p>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit} className="form">
                    <FormGroup controlId='email' className="mb-3">
                      <FormLabel className='text-center' >Email:</FormLabel>
                      <FormControl
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </FormGroup>
                    <FormGroup controlId='password' className="mb-3">
                      <FormLabel>Password:</FormLabel>
                      <FormControl
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />

                    </FormGroup>
                    <FormGroup className="mb-3"controlId="checkBox">
                      <p clascName="small">
                        <a className="text-primary" href="#">
                          Forgot password?
                        </a>
                      </p>                      
                    </FormGroup>
                    <div className="d-grid">
                    <Button variant="primary" type="submit">Login</Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0 text-center">
                      Don't have an acconunt?{""}
                      <a href="{''}" className="text.primary fw-bold">
                        Sign up
                      </a>
                    </p>
                  </div>
                  </div>
                </div>
             
            </Card.Body> </div>
          </Card>
        </Col>
      </Row>
    


  );
};

export default LoginPage;