package com.carrental.app.controllers;

import com.carrental.app.models.images.ImageData;
import com.carrental.app.repositories.CarRepository;
import com.carrental.app.repositories.ImageDataRepository;
import com.carrental.app.services.ImageDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/image")
@CrossOrigin
public class ImageController {
    @Autowired
    private final ImageDataService imageDataService;
    private final ImageDataRepository imageDataRepository;
    private final CarRepository carRepository;

    public ImageController(ImageDataService imageDataService, ImageDataRepository imageDataRepository, CarRepository carRepository) {
        this.imageDataService = imageDataService;
        this.imageDataRepository = imageDataRepository;
        this.carRepository = carRepository;
    }


    @GetMapping("/info/{name}")
    public ResponseEntity<?> getImageInfoByName(@PathVariable("name") String name) {
        ImageData image = imageDataService.getInfoByImageByName(name);
        return ResponseEntity.status(HttpStatus.OK).body(image);
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> getImageByName(@PathVariable("name") String name) {
        byte[] image = imageDataService.getImage(name);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }

    @GetMapping("/get/all")
    public List<ImageData> getAllImagesInByte() throws IOException {
        List<ImageData> allImages = imageDataService.getAllImages();
        return allImages;
    }

    @DeleteMapping("/delete/name/{name}")
    public void deleteByName(@PathVariable("name")String name){
        imageDataRepository.deleteByName(name);
    }
    @DeleteMapping("/delete/id/{id}")
    public void deleteById(@PathVariable("id")Long id){
        imageDataRepository.deleteById(id);
    }
    @GetMapping("get/{id}")
    public ImageData getImageById(@PathVariable("id")Long id){
        return imageDataRepository.findById(id).orElseThrow();
    }
}
