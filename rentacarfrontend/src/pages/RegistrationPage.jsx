import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import { Col, FormGroup, Row, Card, Button, FormControl } from 'react-bootstrap';
import FormLabel from 'react-bootstrap/esm/FormLabel';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName]=useState('')
  const [lastName, setLastName]=useState('')
  const [message, setMessage]=useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res =await fetch("http://localhost:8080/customer/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firsrName: firstName,
          lastName:lastName,
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setMessage("Registration is succesful.")
        console.log(setEmail)
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
      <Row className="p-4 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>         
          <Card className="shadow">
          <div className="square border border-3 border-primary">
            <Card.Body>               
              <div className='mb-3 mt-md-4'>
                <h1 className="fw-bold mb-2 text-center ">Registration</h1>
                <p className='mb-3 text-center'>Please add your firstname,lastname,email and password!</p>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit} className="form">
                  <FormGroup controlId='firstname' className="mb-3">
                      <FormLabel className='text-center' >First name:</FormLabel>
                      <FormControl
                        type="text"
                        value={firstName}
                        placeholder="First name"
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </FormGroup>
                    <FormGroup controlId='lastname' className="mb-3">
                      <FormLabel>Last name:</FormLabel>
                      <FormControl
                        type="Last name"
                        placeholder=""
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                      </FormGroup>

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
                    <div className="d-grid">
                    <Button variant="primary" type="submit">Register</Button>
                    </div>
                  </Form>                 
                  </div>
                </div>             
            </Card.Body> </div>
          </Card>
        </Col>
      </Row>
  );
};

export default RegistrationPage;