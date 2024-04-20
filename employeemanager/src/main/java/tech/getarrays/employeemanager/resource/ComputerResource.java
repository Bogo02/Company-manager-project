package tech.getarrays.employeemanager.resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager.model.Computer;
import tech.getarrays.employeemanager.service.ComputerService;

import java.util.List;

@RestController
@RequestMapping("/computer")
public class ComputerResource {
    private final ComputerService ComputerService;

    public ComputerResource(ComputerService ComputerService) {
        this.ComputerService = ComputerService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Computer>> getAllComputer() {
        List<Computer> Computer = ComputerService.findAllComputer();
        return new ResponseEntity<>(Computer, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Computer> getComputerById(@PathVariable("id") Long id) {
        Computer computer = ComputerService.findComputerById(id);
        return new ResponseEntity<>(computer, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Computer> addComputer(@RequestBody Computer computer) {
        Computer newComputer = ComputerService.addComputer(computer);
        return new ResponseEntity<>(newComputer, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Computer> updateComputer(@RequestBody Computer computer) {
        Computer updateComputer = ComputerService.updateComputer(computer);
        return new ResponseEntity<>(updateComputer, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteComputer(@PathVariable("id") Long id) {
        ComputerService.deleteComputer(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
