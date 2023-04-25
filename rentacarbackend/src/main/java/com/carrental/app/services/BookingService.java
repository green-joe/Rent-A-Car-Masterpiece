package com.carrental.app.services;

import com.carrental.app.models.Booking;
import com.carrental.app.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {this.bookingRepository = bookingRepository;}

    public Booking saveOrUpdateABooking(Booking booking){
        return bookingRepository.save(booking);
    }
     public Time convertStringToTime(String time) {
         //String[] partOfTime = time.split(":");
         return Time.valueOf(time);
     }

}
