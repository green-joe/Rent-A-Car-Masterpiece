import React, { useState, useEffect } from "react";
import "../../styles/find-car-form.css";
import { Container, Form, FormGroup, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FindCarForm = () => {
  const navigate = useNavigate();
  const [rentInfo, setRentInfo] = useState({
    fromAddress: "",
    toAddress: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: ""
  });

  const handleInputChange = (event) => { setRentInfo({ ...rentInfo, [event.target.name]: event.target.value }) }
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('rentinfo', JSON.stringify(rentInfo))
    navigate("/cars")
  }
  useEffect(() => {
    localStorage.setItem('rentInfo', JSON.stringify(rentInfo));
  }, [rentInfo])

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit} onChange={handleInputChange} className="form">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <FormGroup className="form__group">
              <input type="text" placeholder="From address" required
                value={rentInfo.fromAddress || ''}
                name="fromAddress"
              />
            </FormGroup>
            <FormGroup className="form__group">
              <input type="date" placeholder="Journey date" required
                value={rentInfo.fromDate || ''}
                name="fromDate" />
            </FormGroup>
            <FormGroup className="form__group">
              <input
                className="journey__time"
                type="time"
                placeholder="Journey time"
                required
                value={rentInfo.fromTime || ''}
                name="fromTime"

              />
            </FormGroup>

            <FormGroup className="form__group">
              <input type="text" placeholder="To address" required
                value={rentInfo.toAddress || ''}
                name="toAddress" />

            </FormGroup>
            <FormGroup className="form__group">
              <input type="date" placeholder="Journey date" required
                name="toDate"
                value={rentInfo.toDate} />
            </FormGroup>
            <FormGroup className="form__group">
              <input
                className="journey__time"
                type="time"
                placeholder="Journey time"
                required
                value={rentInfo.toTime}
                name="toTime"
              />
            </FormGroup>
            {/* <FormGroup className="select__group">
          <select>
            <option value="ac">AC Car</option>
            <option value="non-ac">Non AC Car</option>
          </select>
        </FormGroup> */}


            <FormGroup className="form__group w-100" >
              <button className="btn find__car-btn" onClick={() => navigate("/cars")}>Find Car</button>
            </FormGroup>
          </div>
        </Form>
      </Row>
    </Container>

  );

};

export default FindCarForm;