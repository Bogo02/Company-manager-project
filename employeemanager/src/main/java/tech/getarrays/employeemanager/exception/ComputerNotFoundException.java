package tech.getarrays.employeemanager.exception;

public class ComputerNotFoundException extends RuntimeException {
    public ComputerNotFoundException(String message) {
        super(message);
    }
}