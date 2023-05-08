package com.carrental.app.models;

import com.carrental.app.models.images.ImageData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
@Data
@RequiredArgsConstructor
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Car implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String brand;
    private String model;
    private Boolean gps;
    private Boolean automatic;
    private String speed;
    private String licencePlate;
    private String description;
    private Double pricePerDay;
    @Fetch(FetchMode.JOIN)
    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(inverseJoinColumns = @JoinColumn(name = "image_id"), name = "car_image")
    private List<ImageData> carImages=new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

   public void setCarImages(List<ImageData> carImages) {
        this.carImages = carImages;
    }

}
