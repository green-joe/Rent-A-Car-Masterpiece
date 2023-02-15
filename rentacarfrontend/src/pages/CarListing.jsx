import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
//import carData from "../assets/data/carData";


const CarListing = () => {
  const [selected, setSelected] = useState('')
  const [sorticon, setSortIcon] = useState()
  const handleChange = event => {
    setSelected(event.target.value);
  }

  useEffect(() => {
    if (selected == "" || selected == "Select") {
      setSortIcon(<i className="ri-list-unordered"></i>)
    } else if (selected == "Select" || selected == "low") {
      setSortIcon(<i className="ri-sort-asc"></i>)
    } else {
      setSortIcon(<i className="ri-sort-desc"></i>)
    }
  }, [selected])


  return (

    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  {sorticon}
                </span>
                <select onChange={handleChange} > {/* {(e)=>{const selectedOrder=e.target.value;                  
                setSelected(selectedOrder)}}> */}
                  <option defaultValue={0} >Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
                
              </div>

            </Col >
            <CarItem order={selected} />
          </Row>
        </Container>
      </section>
    </Helmet>

  );
};

export default CarListing;