package com.carrental.app.services;

import com.carrental.app.CustomerExceptions.InvalidPasswordException;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Set;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class CustomerService implements UserDetailsService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email: "+ email));

        return new org.springframework.security.core.userdetails.User(customer.getEmail(),
                customer.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));

    }

    public boolean isValidPassword(String password) {
        // Minimum length of 8 characters
        if (password.length() < 8) {
            throw new InvalidPasswordException("The password must be at least 8 characters long.");
        }
        // Must contain at least one uppercase letter
        if (!password.matches(".*[A-Z].*")) {
            throw new InvalidPasswordException("The password must contain at least 1 capital letter");
        }
        // Must contain at least one lowercase letter
        if (!password.matches(".*[a-z].*")) {
            throw new InvalidPasswordException("The password must contain at least 1 lowercase letter");
        }
        // Must contain at least one digit
        if (!password.matches(".*\\d.*")) {
            throw new InvalidPasswordException("The password must contain at least 1 digit");
        }

        // Must contain at least one special character
        String specialChars = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";
        String pattern = ".*[" + Pattern.quote(specialChars) + "].*";
        if (!password.matches(pattern)){
            throw new InvalidPasswordException("The password must contain at least 1 special letter");
        }

        return true;
    }

}


