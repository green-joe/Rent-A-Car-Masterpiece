package com.carrental.app.models;

import com.carrental.app.models.images.ImageData;
import lombok.AllArgsConstructor;
import lombok.Data;
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
import java.sql.Time;

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
    @Column(name = "pickup_time")
    private Time pickupTime;

    @Column(name = "return_time")
    private Time returnTime;

    @Column(name="notes")
    private String textArea;

    @Column(name="from_address")
    private String fromAddress;

    @Column(name="to_address")
    private String toAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_image_id")
    private ImageData carImage;

    public void setPickupTime(String time) {
        this.pickupTime = Time.valueOf(time);
    }

    public void setReturnTime(String time) {
        this.returnTime = Time.valueOf(time);

    }
}
