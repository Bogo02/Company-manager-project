package tech.getarrays.employeemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager.exception.ComputerNotFoundException;
import tech.getarrays.employeemanager.model.Computer;
import tech.getarrays.employeemanager.repo.ComputerRepo;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ComputerService {
    private final ComputerRepo ComputerRepo;

    @Autowired
    public ComputerService(ComputerRepo ComputerRepo) {
        this.ComputerRepo = ComputerRepo;
    }

    public Computer addComputer(Computer Computer) {
        Computer.setImageUrl(UUID.randomUUID().toString()); // or set the image URL as needed
        return ComputerRepo.save(Computer);
    }

    public List<Computer> findAllComputer() {
        return ComputerRepo.findAll();
    }

    public Computer updateComputer(Computer Computer) {
        return ComputerRepo.save(Computer);
    }

    public Computer findComputerById(Long id) {
        return ComputerRepo.findComputerById(id).orElseThrow(() ->
                new ComputerNotFoundException("Computer by id " + id + " was not found"));
    }

    public void deleteComputer(Long id) {
        ComputerRepo.deleteComputerById(id);
    }
}
