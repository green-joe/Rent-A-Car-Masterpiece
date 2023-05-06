package com.carrental.app.controllers;

import com.carrental.app.CustomerExceptions.InvalidPasswordException;
import com.carrental.app.models.Customer;
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
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.management.InstanceNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
        if (customerRepository.existsByFirstNameAndLastName(customer.getFirstName(), customer.getLastName())) {
            return new ResponseEntity<>("Customername is already taken!", HttpStatus.BAD_REQUEST);
        }
        if (customerRepository.existsByEmail(customer.getEmail())) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }
        try {
            customerService.isValidPassword(customer.getPassword());
        } catch (InvalidPasswordException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        Customer newCustomer = new Customer();
        newCustomer.setFirstName(customer.getFirstName());
        newCustomer.setLastName(customer.getLastName());
        newCustomer.setEmail(customer.getEmail());
        newCustomer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customerRepository.save(newCustomer);
        return new ResponseEntity<>("Customer registered successfully", HttpStatus.OK);

    }

    @PostMapping("/auth/login")
    public ResponseEntity<String> authenticateUser(@RequestBody Customer customer) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(customer.getEmail(), customer.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String message = "User signed-in successfully!";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Authentication failed: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/auth/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }

    @GetMapping("/get/byEmail")
    public ResponseEntity<Customer> getCustomerByEmail(@RequestParam("email") String email) throws InstanceNotFoundException {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new InstanceNotFoundException("Customer not found for email: " + email));
        return ResponseEntity.ok(customer);
    }
}



