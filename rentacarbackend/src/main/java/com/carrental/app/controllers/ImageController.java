package com.carrental.app.controllers;

import com.carrental.app.models.images.ImageData;
import com.carrental.app.models.images.ImageUploadResponse;
import com.carrental.app.services.ImageDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
public class ImageController {
    @Autowired
    private ImageDataService imageDataService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        ImageUploadResponse response = imageDataService.uploadImage(file);
        return ResponseEntity.status(HttpStatus.OK).body(response);
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
}
