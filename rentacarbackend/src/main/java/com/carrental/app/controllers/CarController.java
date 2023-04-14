package com.carrental.app.controllers;

import com.carrental.app.models.Car;
import com.carrental.app.models.images.ImageData;
import com.carrental.app.models.images.ImageUploadResponse;
import com.carrental.app.repositories.CarRepository;
import com.carrental.app.repositories.ImageDataRepository;
import com.carrental.app.services.CarService;
import com.carrental.app.services.ImageDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/car")
@CrossOrigin
@RequiredArgsConstructor
public class CarController {

    @Autowired
    private final ImageDataRepository imageDataRepository;
    private final ImageDataService imageDataService;
    private final CarRepository carRepository;
    private final CarService carService;

    @PostMapping("/save")
    public Car create(@RequestBody Car car) {
        return carService.saveCar(car);
    }
    @PostMapping("/{id}/images")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file, @PathVariable("id") Long id) throws IOException {
        Car car=carRepository.findById(id).orElseThrow();
        ImageUploadResponse response = imageDataService.uploadImage(file);
        List<ImageData> imageDataList=new ArrayList<>();
        imageDataList=car.getCarImages();
        imageDataList.add(response.getImageData());
        car.setCarImages(imageDataList);
        carRepository.save(car);
        return ResponseEntity.status(HttpStatus.OK).body(car);
    }

    @GetMapping("/get/all")
    public List<Car> getAllCars() {
        List<Car> allCars = carService.findAllCars();
        List<Car> resultCars = new ArrayList<>();
        return allCars;
    }

    @PutMapping("/edit/{id}")
    public Car editCarData(@RequestBody Car car, @PathVariable("id") Long id){
        Car updateCar=carRepository.findById(id).orElseThrow();
        carService.setCarDetails(car,updateCar);
        return carRepository.save(updateCar);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id")Long id){
        carRepository.deleteById(id);
    }


}
