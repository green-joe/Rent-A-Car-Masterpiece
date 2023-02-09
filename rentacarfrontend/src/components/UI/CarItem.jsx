import React, { useState, useEffect, Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { getAllCars } from "../../services/GetCarsData";


const CarItem = (props) => { 
  const [cars, setCars] = useState([]) 
  let carsItems = []
  let priceDescendin=[]
  let priceAscending=[]
  
    useEffect(() => {
    
      getAllCars().then(data => {
        for (let i = 0; i < data.length; i++) {          
          var base64Flag = "data:image/png;base64,"
          let automatic,gps;            
          if (data[i].automatic === true || data[i].gps===true) {
            automatic = 'Automatic'
            gps='GPS Navigation'
          } else {
            automatic = 'Non Automatic',
            gps='Non GPS Navigation'
          }
          const car =
          {
            imageData: base64Flag + data[i].carImages[0].imageData,
            name: data[i].name,
            price: data[i].pricePerDay,
            model: data[i].model,
            automatic: automatic,
            gps:data[i].gps
          }
          carsItems.push(car) 
                      
        }      
       
      if(props.order==""){ 
        setCars(carsItems)      
      }
      
      if(props.order=="low"){       
      priceDescendin=[...carsItems].sort((a,b)=>a.price-b.price) 
      setCars(priceDescendin)      
      }
     
      if(props.order=="high"){
        priceAscending=[...carsItems].sort((a,b)=>b.price-a.price) 
        setCars(priceAscending)
      }
      
      if(props.order=="Select"){
        setCars(carsItems)
      }       
        
       })
  },[cars])
   
  
  return (   
         
      <Row>
        {cars.map((item, index) => (
           <Col lg="4" md="4" sm="6" className="mb-5">
            <div className="h-100 car__item">
              <div className="car__img">
                <img key={index} src={item.imageData} alt={item.name} className="w-100"/>
              </div>

              <div className="car__item-content mt-4">
                <h4 className="section__title text-center">{item.name}</h4>
                <h6 className="rent__price text-center mt-4">
                  ${item.price}.00<span>/ Day</span>
                </h6>

                <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-car-line"></i> {item.model}
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-settings-2-line"></i> {item.automatic}
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-timer-flash-line"></i> {item.speed}
                  </span>
                </div>

                <button className=" w-50 car__item-btn car__btn-rent">
                <Link to={`/cars/${item.name}`}>Rent</Link>
                </button>

                <button className=" w-50 car__item-btn car__btn-details">
                  <Link to={`/cars/${item.name}`}>Details</Link>
                </button>
              </div>
            </div>
           </Col>
        ))
        }
      </Row>       
     
  );
};

export default CarItem;

