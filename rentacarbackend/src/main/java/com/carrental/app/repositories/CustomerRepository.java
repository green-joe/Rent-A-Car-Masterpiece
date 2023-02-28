package com.carrental.app.repositories;

import com.carrental.app.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

    Optional<Customer> findByEmail(String email);
    Boolean existsByFirstNameAndLastName(String firstName, String lastName);
    Boolean existsByEmail(String email);
}
