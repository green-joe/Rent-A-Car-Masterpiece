package com.carrental.app.repositories;

import com.carrental.app.models.images.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageDataRepository extends JpaRepository<ImageData, Long> {
    @Query(value = "select i from ImageData i where i.name = :name ")
    Optional<ImageData> findByName(String name);
}
