package com.carrental.app.repositories;

import com.carrental.app.models.Car;
import com.carrental.app.models.images.ImageData;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CarRepository extends JpaRepository<Car,Long>{

}
