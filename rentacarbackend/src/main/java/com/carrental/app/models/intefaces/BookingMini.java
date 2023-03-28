package com.carrental.app.models.intefaces;

import java.sql.Date;

public interface BookingMini {
    Long getCustomerId();

    Long getCarId();

    Date getPickupDate();

    Date getReturnDate();
}
