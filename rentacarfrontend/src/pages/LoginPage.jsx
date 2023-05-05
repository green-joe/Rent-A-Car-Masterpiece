import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import { Col, FormGroup, Row, Card, Button, FormControl } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import FormLabel from 'react-bootstrap/esm/FormLabel';
import "./../styles/login-page.css"
import hidePwdImg from '../assets/all-images/hide-password.svg'
import showPwdImg from '../assets/all-images/show-password.svg'
import Popup from '../services/Popup'
import '../styles/popup.css'




const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupErrorMessage, setPopupErrorMessage] = useState('')
  const storedData = localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const navigate = useNavigate();

  const handlePopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = await fetch("http://localhost:8080/customer/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),

    });

    

    if (res.status === 200) {            
      
      setIsLoggedIn(true)
      localStorage.setItem('isLoggedIn', JSON.stringify(true))
      window.dispatchEvent(new Event('storage'))     

      navigate("/userprofile/", { state: email });      

    } else {
      setPopupMessage('error')
      res.text().then(errorMessage => {
        setPopupErrorMessage(errorMessage)
      })      
    };

  }


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
                        type={isRevealPwd ? "text" : "password"}
                        required="required" autocomplete="off"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <img
                        title={isRevealPwd ? "Hide password" : "Show password"}
                        src={isRevealPwd ? hidePwdImg : showPwdImg}
                        onClick={() => setIsRevealPwd(prevState => !prevState)}
                      />

                    </FormGroup>
                    <FormGroup className="mb-3" controlId="checkBox">
                      <p clascName="small">
                        <a className="text-primary" href="#">
                          Forgot password?
                        </a>
                      </p>
                    </FormGroup>
                    <div className="d-grid">
                      <Button variant="primary" type="submit" onClick={handlePopup}>Login</Button>
                      {popupMessage === 'error' && (
                        showPopup && <Popup message={popupErrorMessage} onClose={handleClosePopup} />
                      )}
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0 text-center">
                      Don't have an account?{""}
                      <a href="/registration" className="text.primary fw-bold">
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