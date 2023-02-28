package com.carrental.app.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "customers", uniqueConstraints = {
       @UniqueConstraint(columnNames = {"email"})
})
//@Table(name = "customers")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class Customer extends User {

}
