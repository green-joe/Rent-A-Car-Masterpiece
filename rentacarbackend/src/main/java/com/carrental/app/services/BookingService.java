package com.carrental.app.services;

import com.carrental.app.models.Booking;
import com.carrental.app.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {this.bookingRepository = bookingRepository;}

    public Booking saveOrUpdateABooking(Booking booking){
        return bookingRepository.save(booking);
    }

}
