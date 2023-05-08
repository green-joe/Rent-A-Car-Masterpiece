package com.carrental.app.models.images;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ImageUploadResponse {

    private String message;
    private ImageData imageData;
    
}
