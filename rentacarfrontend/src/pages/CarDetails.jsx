import React, { useEffect, useState } from "react";
//import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { getAllCars } from "../services/GetCarsData";

const CarDetails = () => {
  const { slug } = useParams();
  const [cars, setCars] = useState()
  const [singleCarItem, setSingleCarItem] = useState({})
  let oneCar = {}

  //const [singleCarItem, setSingleCarItem]=useState([]);


  useEffect(() => {

    let array = []
    getAllCars().then(data => {
      array = [...data]

      for (let i = 0; i < array.length; i++) {

        if (array[i].name === slug)
          oneCar = array[i]
        console.log(oneCar)
        setSingleCarItem(oneCar)
      }
    })

    console.log(singleCarItem.name)
    // const oneCar = array.find((item) => item.name === slug)
    // console.log(oneCar)
    // setShwoCar(oneCar)
    // console.log(showCar)
   // window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title={singleCarItem.name}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleCarItem.imageData} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleCarItem.name}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${ singleCarItem.price}.00 / Day
                  </h6>

                  {/* <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({singleCarItem.rating} ratings)
                  </span> */}
                </div>

                <p className="section__description">
                  {singleCarItem.description }
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.model}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {"speed200"}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.gps}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {"seat-valami"}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.name}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="12" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            {/* <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default CarDetails;