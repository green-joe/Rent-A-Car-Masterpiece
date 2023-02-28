package com.carrental.app.services;

import com.carrental.app.models.Customer;
import com.carrental.app.repositories.CarRepository;
import com.carrental.app.repositories.CustomerRepository;
import com.carrental.app.repositories.ImageDataRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CustomerService implements UserDetailsService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email: "+ email));


        return new org.springframework.security.core.userdetails.User(customer.getEmail(),
                customer.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));

    }
}


