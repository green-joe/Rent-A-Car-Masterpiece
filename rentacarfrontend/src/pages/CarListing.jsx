import React, {useState} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
//import carData from "../assets/data/carData";


const CarListing = () => {
  const [selected, setSelected]=useState('')
  const handleChange = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
  
  
  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-desc"></i> Sort By
                </span>

               <select onChange={handleChange}> {/* {(e)=>{const selectedOrder=e.target.value;  
                setSelected(selectedOrder)}}> */}
                  <option defaultValue={0} >Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>                 
                </select>  
                {selected}     
                     
              </div>
                
            </Col >
             <CarItem order={selected}/>   
            {/* {carData.map((item) => ( */}              
               {/* <CarItem order={selected}/>            */}
            {/* ))} */}
          </Row>
        </Container>
      </section>
    </Helmet>
    
  );
};

export default CarListing;