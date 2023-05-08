package com.carrental.app.repositories;

import com.carrental.app.models.images.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ImageDataRepository extends JpaRepository<ImageData, Long> {
    @Query(value = "select i from ImageData i where i.name = :name ")
    Optional<ImageData> findByName(String name);
    @Query(value="select * from image_data ", nativeQuery = true)
    List<ImageData> findAll();
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ImageData i WHERE i.name= :name ")
    void deleteByName(@Param("name")String name);

}
