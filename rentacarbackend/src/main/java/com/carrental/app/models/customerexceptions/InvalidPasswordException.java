package com.carrental.app.CustomerExceptions;

public class InvalidPasswordException extends RuntimeException {
    public  InvalidPasswordException(String message) {
        super(message);
    }
}
