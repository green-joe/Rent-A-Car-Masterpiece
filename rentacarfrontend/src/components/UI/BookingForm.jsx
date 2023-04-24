import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Button } from 'reactstrap'
import "../../styles/booking-form.css";


const BookingForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storedData = localStorage.getItem('rentInfo');
  const [rentInfo, setRentInfo] = useState(JSON.parse(storedData)) || {}
  console.log(rentInfo)

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setRentInfo((prevRentInfo) => ({
    ...prevRentInfo,
    [name]: value,
  }));
  localStorage.setItem(
    'rentInfo',
    JSON.stringify({
      ...rentInfo,
      [name]: value,
    })
  );
  }

  //const storedData = localStorage.getItem('rentInfo');
  // const rentInfo = JSON.parse(storedData)
  console.log(rentInfo.fromDate)
  const renter=JSON.parse(sessionStorage.getItem('customer'))
  console.log(renter.id)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isLoggedIn==true){

    }

    let res = await fetch("http://localhost:8080/booking/save", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
      customer:{  
      id:renter.id,
      },
      pickupDate:fromDate,
      returnDate:toDate,
      fromAddress:fromAddress,
      toAddress:toAddress,
      }),

    });

    if (res.status === 200) {
      console.log("its ok")
      /* setFirstName("")      
       setLastName("");
       setEmail("");
       setPassword("");
       setConfirmPassword("")*/
      //setPopupMessage('success')
    } else {
      // setPopupMessage('error')
      res.text().then(errorMessage => {
        console.log(errorMessage)
        // setPopupErrorMessage(errorMessage)
      })
    }



  };
  const customer = JSON.parse(sessionStorage.getItem('customer'));
  useEffect(() => {

    const token = sessionStorage.getItem('customer');
    if (token != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  console.log(isLoggedIn)
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className='booking__form d-inline-block me-4 mb-4'>
        <input type="text" name="firstName"placeholder='First name' value={customer.firstName} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" name="lastName"placeholder="Last Name" value={customer.lastName} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" name="email"  placeholder="Email" value={customer.email} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="number" name="phoneNumber" placeholder="Phone Number" disabled value={customer.phoneNumber} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" name="fromAddress"placeholder="From Address" value={rentInfo.fromAddress} onChange={handleInputChange} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" name="toAddress" placeholder="To Address" value={rentInfo.toAddress} onChange={handleInputChange} />
      </FormGroup>     
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input className="time__picker"  name="fromDate" placeholder="Journey Time" type="date" value={rentInfo.fromDate} onChange={handleInputChange} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          name='fromTime'
          placeholder="Journey Time"
          className="time__picker"
          value={rentInfo.fromTime}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input className="time__picker"  name="toDate" placeholder="Journey Time" type="date" value={rentInfo.toDate} onChange={handleInputChange} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          name='toTime'
          placeholder="Journey Time"
          className="time__picker"
          value={rentInfo.toTime}
          onChange={handleInputChange}
        />
      </FormGroup>


      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          name='textArea'
          placeholder="Write"
        ></textarea>
      </FormGroup>
      <div className="d-grid">
        <Button variant="primary" type="submit" >Booking</Button>
        {/* {popupMessage === 'error' && (
                       // showPopup && <Popup message={popupErrorMessage} 
                       //onClose={} />
                     // )} */}
      </div>

    </Form>
  )
}

export default BookingForm