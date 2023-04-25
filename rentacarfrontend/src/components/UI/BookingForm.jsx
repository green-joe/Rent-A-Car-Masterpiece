import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Button } from 'reactstrap'
import "../../styles/booking-form.css";
import { useLocation } from "react-router-dom";


const BookingForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [textArea, setTextArea] = useState('')
  const storedData = localStorage.getItem('rentInfo');
  const [rentInfo, setRentInfo] = useState(JSON.parse(storedData)) || {} 
  const [hours, minutes] = rentInfo.toTime.split(':');
  // const Time={
  //   hour:hours,
  //   minute:minutes,
  //   second:0 
  // }
  
  //const time = new Time(parseInt(hours), parseInt(minutes), 0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  console.log(rentInfo, id)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //setTextArea(e.target.value)
   
    console.log(hourToTime,minutesToTime)
  
    setRentInfo((prevRentInfo) => ({       
    
      ...prevRentInfo,
      [name]: value,
    }));
    localStorage.setItem(
      'rentInfo',
      JSON.stringify({
        ...rentInfo,
        [name]: value
      })
    );
    
  }

  //const storedData = localStorage.getItem('rentInfo');
  // const rentInfo = JSON.parse(storedData)
  console.log(rentInfo.fromDate, rentInfo.toDate, textArea, time)
  const renter = JSON.parse(sessionStorage.getItem('customer'))
  console.log(renter.id)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoggedIn == true) {

    }

    let res = await fetch("http://localhost:8080/booking/save", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        customer: {
          id: renter.id,
        },
        car: {
          id: id
        },
        pickupDate: rentInfo.fromDate,
        returnDate: rentInfo.toDate,
        pickUpTime: rentInfo.fromTime,
        returTime: rentInfo.toTime,
        fromAddress: rentInfo.fromAddress,
        toAddress: rentInfo.toAddress,
        customerNotes: textArea,
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
        <input type="text" name="firstName" placeholder='First name' value={customer.firstName} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" name="lastName" placeholder="Last Name" value={customer.lastName} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" name="email" placeholder="Email" value={customer.email} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="number" name="phoneNumber" placeholder="Phone Number" disabled value={customer.phoneNumber} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" name="fromAddress" placeholder="From Address" value={rentInfo.fromAddress} onChange={handleInputChange} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" name="toAddress" placeholder="To Address" value={rentInfo.toAddress} onChange={handleInputChange} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input className="time__picker" name="fromDate" placeholder="Journey Time" type="date" value={rentInfo.fromDate} onChange={handleInputChange} />
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
        <input className="time__picker" name="toDate" placeholder="Journey Time" type="date" value={rentInfo.toDate} onChange={handleInputChange} />
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
          //value={textArea}
          placeholder="Write"
        //  onChange={handleInputChange}
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