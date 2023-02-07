package com.carrental.app.services;

import com.carrental.app.models.Car;
import com.carrental.app.models.images.ImageData;
import com.carrental.app.models.images.ImageUtil;
import com.carrental.app.repositories.CarRepository;
import com.carrental.app.repositories.ImageDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarService {
    @Autowired
    private final CarRepository carRepository;
    private final ImageDataRepository imageDataRepository;

    public CarService(CarRepository carRepository, ImageDataRepository imageDataRepository) {
        this.carRepository = carRepository;
        this.imageDataRepository = imageDataRepository;
    }

    @Transactional
    public Car saveCar(Car car) {
        return carRepository.save(car);
    }


    public List<Car> findAllCars() {
        List<Car> allCars = carRepository.findAll();
        List<ImageData> imageDataList = new ArrayList<>();
        if (!allCars.isEmpty() || allCars != null) {
            for (int i = 0; i < allCars.size(); i++) {
                imageDataList = allCars.get(i).getCarImages();
                for (ImageData imageData : imageDataList) {
                    imageData.setImageData(ImageUtil.decompressImage(imageData.getImageData()));
                }
                allCars.get(i).setCarImages(imageDataList);
            }
        }
        return allCars;
    }

    public void setCarDetails(Car car, Car updateCar) {
        updateCar.setName(car.getName());
        updateCar.setBrand(car.getBrand());
        updateCar.setSpeed(car.getSpeed());
        updateCar.setAutomatic(car.getAutomatic());
        updateCar.setDescription(car.getDescription());
        updateCar.setGps(car.getGps());
        updateCar.setLicencePlate(car.getLicencePlate());
        updateCar.setModel(car.getModel());
        updateCar.setPricePerDay(car.getPricePerDay());
    }



}
