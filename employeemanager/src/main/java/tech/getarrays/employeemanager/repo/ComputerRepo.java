package tech.getarrays.employeemanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.employeemanager.model.Computer;

import java.util.Optional;

public interface ComputerRepo extends JpaRepository<Computer, Long> {
    void deleteComputerById(Long id);

    Optional<Computer> findComputerById(Long id);
}
