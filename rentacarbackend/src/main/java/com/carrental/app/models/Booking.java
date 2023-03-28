package com.carrental.app.models;

import com.carrental.app.models.images.ImageData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name="booking")
@Data
@RequiredArgsConstructor
@AllArgsConstructor

public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY,targetEntity = Customer.class)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY,targetEntity = Car.class)
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Car car;

    @Column(name = "pickup_date")
    private Date pickupDate;

    @Column(name = "return_date")
    private Date returnDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_image_id")
    private ImageData carImage;


}
