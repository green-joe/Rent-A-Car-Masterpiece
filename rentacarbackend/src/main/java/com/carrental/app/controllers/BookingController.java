package com.carrental.app.controllers;

import com.carrental.app.models.Booking;
import com.carrental.app.models.intefaces.BookingMini;
import com.carrental.app.repositories.BookingRepository;
import com.carrental.app.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.management.InstanceNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin
@RequiredArgsConstructor
public class BookingController {

    @Autowired
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;


    @GetMapping("/get/all")
    public List<BookingMini> getAllBookings() {
        return bookingRepository.findAllBy();
    }

    @GetMapping("/get/id/{id}")
    public Booking getBookingById(@PathVariable Long id) throws InstanceNotFoundException {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new InstanceNotFoundException("Booking not found"));
    }

    @PostMapping("/save")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.saveOrUpdateABooking(booking);
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking bookingData) throws InstanceNotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new InstanceNotFoundException("Booking not found"));
        booking.setPickupDate(bookingData.getPickupDate());
        booking.setReturnDate(bookingData.getReturnDate());
        booking.setCarImage(bookingData.getCarImage());
        return bookingRepository.save(booking);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) throws InstanceNotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new InstanceNotFoundException("Booking not found"));
        bookingRepository.delete(booking);
        return ResponseEntity.ok().build();
    }

}
