package com.carrental.app.controllers;

import com.carrental.app.CustomerExceptions.InvalidPasswordException;
import com.carrental.app.models.Customer;
import com.carrental.app.models.authresponse.AuthResponse;
import com.carrental.app.repositories.CustomerRepository;
import com.carrental.app.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
@CrossOrigin
@RequiredArgsConstructor
public class CustomerController {
    @Autowired
    public final CustomerRepository customerRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final CustomerService customerService;

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        // add check for customerrname exists in a DB
        if (customerRepository.existsByFirstNameAndLastName(customer.getFirstName(), customer.getLastName())) {
            return new ResponseEntity<>("Customername is already taken!", HttpStatus.BAD_REQUEST);
        }
        // add check for email exists in DB
        if (customerRepository.existsByEmail(customer.getEmail())) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }
        try {
            customerService.isValidPassword(customer.getPassword());
        }catch (InvalidPasswordException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        // create customer object
        Customer newCustomer = new Customer();
        newCustomer.setFirstName(customer.getFirstName());
        newCustomer.setLastName(customer.getLastName());
        newCustomer.setEmail(customer.getEmail());
        newCustomer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customerRepository.save(newCustomer);
        return new ResponseEntity<>("Customer registered successfully", HttpStatus.OK);

    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> authenticateUser(@RequestBody Customer customer) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                  customer.getEmail(),customer.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String message = "User signed-in successfully!";
            return new ResponseEntity<>(new AuthResponse(message,customer), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Authentication failed: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

}
