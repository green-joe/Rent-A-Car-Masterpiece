package com.carrental.app.repositories;

import com.carrental.app.models.Booking;
import com.carrental.app.models.intefaces.BookingMini;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<BookingMini> findAllBy();

}
