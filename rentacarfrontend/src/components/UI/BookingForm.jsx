import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Button } from 'reactstrap'
import "../../styles/booking-form.css";
import { useLocation } from "react-router-dom";
import Popup from '../../services/Popup';




const BookingForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [textArea, setTextArea] = useState('')
  const storedData = localStorage.getItem('rentInfo');
  const [rentInfo, setRentInfo] = useState(JSON.parse(storedData) || null)
  const [toTimeHours, toTimeMinutes] = rentInfo != null ? rentInfo.toTime.split(':') : "";
  const [fromTimeHours, fromTimeMinutes] = rentInfo != null ? rentInfo.fromTime.split(':') : "";
  const toTimeWithSeconds = toTimeHours + ":" + toTimeMinutes + ":00";
  const fromTimeWithSeconds = fromTimeHours + ":" + fromTimeMinutes + ":00";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [popupErrorMessage, setPopupErrorMessage] = useState('')
  const [popUpMessage, setPopUpMessage] = useState("")
  const [showPopup, setShowPopup] = useState(false);


  const handleClosePopup = () => {
    setShowPopup(false);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'textArea') {
      setTextArea(e.target.value);
    }
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


  //console.log(rentInfo.fromDate, rentInfo.toDate, textArea, toTimeWithSeconds, fromTimeWithSeconds)
  const renter = JSON.parse(localStorage.getItem('customer'))


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      const { fromDate, toDate, fromTime, toTime, fromAddress, toAddress, textArea } = rentInfo;

      if (!fromDate || !toDate || !fromTime || !toTime || !fromAddress || !toAddress) {
        setPopupErrorMessage("Please fill all required fields");
        setShowPopup(true)
        return;
      }

      if (textArea && textArea.length > 255) {
        setPopupErrorMessage("The text area field is too long (maximum 255characters)");
        setShowPopup(true)

      } else if (fromAddress && fromAddress.length > 100 || toAddress && toAddress.length > 100) {
        setPopupErrorMessage("The text area field is too long (maximum 100 characters)");
        setShowPopup(true)

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
          pickupTime: fromTimeWithSeconds,
          returnTime: toTimeWithSeconds,
          fromAddress: rentInfo.fromAddress,
          toAddress: rentInfo.toAddress,
          textArea: textArea,
        }),

      });

      console.log(rentInfo.fromDate, rentInfo.toDate, textArea, toTimeWithSeconds, fromTime, rentInfo.fromAddress)
      if (res.status === 200) {
        console.log("its ok")
        setPopUpMessage("The booking is successful")
        setShowPopup(true)
        setTextArea('')



      } else {

        res.text().then(errorMessage => {
          console.log(errorMessage)

        })
      }
    }
  };


  const customer = JSON.parse(localStorage.getItem('customer'))


  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem('customer'))

    if (customer != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);

    }
  }, []);
  console.log(isLoggedIn)
  return (
    <Form onSubmit={handleSubmit}>

      <FormGroup className='booking__form d-inline-block me-4 mb-4'>
        <input type="text" name="firstName" placeholder='First name' value={customer == null ? "" : customer.firstName} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" name="lastName" placeholder="Last Name" value={customer == null ? "" : customer.lastName} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" name="email" placeholder="Email" value={customer == null ? "" : customer.email} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="number" name="phoneNumber" placeholder="Phone Number" disabled value={customer == null ? "" : customer.phoneNumber} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" name="fromAddress" placeholder="From Address" value={rentInfo == null ? "" : rentInfo.fromAddress} minLength={1} maxLength={100} onChange={handleInputChange} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" name="toAddress" placeholder="To Address" value={rentInfo == null ? "" : rentInfo.toAddress} onChange={handleInputChange} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input className="time__picker" name="fromDate" placeholder="Journey Time" type="date" value={rentInfo == null ? "" : rentInfo.fromDate} onChange={handleInputChange} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          name='fromTime'
          placeholder="Journey Time"
          className="time__picker"
          value={rentInfo == null ?"":rentInfo.fromTime}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input className="time__picker" name="toDate" placeholder="Journey Time" type="date" value={rentInfo == null ? "" : rentInfo.toDate} onChange={handleInputChange} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          name='toTime'
          placeholder="Journey Time"
          className="time__picker"
          value={rentInfo==null?"":rentInfo.toTime}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          name='textArea'
          value={textArea}
          placeholder="Write"
          onChange={handleInputChange}
        ></textarea>
      </FormGroup>
      <div className="d-grid">
        <Button variant="primary" type="submit" >Booking</Button>
        {popupErrorMessage !== '' && (
          showPopup && <Popup message={popupErrorMessage}
            onClose={handleClosePopup} />
        )}
        {popUpMessage !== '' && (
          showPopup && <Popup message={popUpMessage}
            onClose={handleClosePopup} />
        )}
      </div>
    </Form>
  )
}

export default BookingForm