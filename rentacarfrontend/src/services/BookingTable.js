import React, { useState, useEffect } from "react";
import '../styles/bookingtable.css'
import { Container, Row, Col } from 'react-bootstrap'

function BookingsTable() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/booking/get/all`)
            .then((res) => res.json())
            .then((data) => setBookings([...data], console.log(...data)));
    }, []);

    return (
        <Container className="py-5">
            <Row>
                <Col log='12'>
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>Car</th>
                                <th>Pickup Date</th>
                                <th>Pickup Time</th>
                                <th>Return Date</th>
                                <th>Return Time</th>
                                <th>Notes</th>
                                <th>From Address</th>
                                <th>To Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.carId}</td>
                                    <td>{booking.pickupDate}</td> 
                                    <td>{booking.pickupTime}</td>
                                    <td>{booking.returnDate}</td>                                   
                                    <td>{booking.returnTime}</td>
                                    <td>{booking.textArea}</td>
                                    <td>{booking.fromAddress}</td> 
                                    <td>{booking.toAddress}</td>                                 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    )
}
export default BookingsTable;
