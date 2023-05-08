package com.carrental.app.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.io.Serializable;

@Entity
@Table(name = "customers", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email"})
})

@Data
@EqualsAndHashCode(callSuper = false)
@RequiredArgsConstructor

public class Customer extends User {


}



