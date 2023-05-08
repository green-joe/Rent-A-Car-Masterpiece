package com.carrental.app.services;

import com.carrental.app.models.images.ImageData;
import com.carrental.app.models.images.ImageUploadResponse;
import com.carrental.app.models.images.ImageUtil;
import com.carrental.app.repositories.ImageDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImageDataService {

    @Autowired
    private ImageDataRepository imageDataRepository;

    public ImageUploadResponse uploadImage(MultipartFile file) throws IOException {

        ImageData imageData=imageDataRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtil.compressImage(file.getBytes())).build());

        return new ImageUploadResponse("Image uploaded successfully " + file.getOriginalFilename(),imageData);

    }

    @Transactional
    public ImageData getInfoByImageByName(String name) {
        Optional<ImageData> dbImage = imageDataRepository.findByName(name);
        return ImageData.builder()
                .id(dbImage.get().getId())
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .imageData(ImageUtil.decompressImage(dbImage.get().getImageData())).build();
    }

    @Transactional
    public byte[] getImage(String name) {
        Optional<ImageData> dbImage = imageDataRepository.findByName(name);
        byte[] image = ImageUtil.decompressImage(dbImage.get().getImageData());
        return image;
    }
    @Transactional
    public List getAllImages()  {
        List<ImageData> allImages;
        allImages = imageDataRepository.findAll();
        List<ImageData> resultImages=new ArrayList<>();
        for(int i=0;i<allImages.size();i++){
             resultImages.add(ImageData.builder()
                    .id(allImages.get(i).getId())
                    .name(allImages.get(i).getName())
                    .type(allImages.get(i).getType())
                    .imageData(ImageUtil.decompressImage(allImages.get(i).getImageData())).build());
        }
        return resultImages;
    }

    public List<String> getImageDataName(){
        List<String> allImageDataName=new ArrayList<>();
        List<ImageData> allImages=getAllImages();
        allImageDataName=allImages.stream().map(ImageData::getName).collect(Collectors.toList());
        System.out.println(allImageDataName+"kk");
        return allImageDataName;
    }


}
