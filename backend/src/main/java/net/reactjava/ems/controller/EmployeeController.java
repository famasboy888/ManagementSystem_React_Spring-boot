package net.reactjava.ems.controller;

import lombok.AllArgsConstructor;
import net.reactjava.ems.dto.EmployeeDto;
import net.reactjava.ems.services.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/employees")
public class EmployeeController {
    private EmployeeService employeeService;

    //Build Employee API
    @PostMapping
    public ResponseEntity<EmployeeDto> addEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto addedEmployeeDto = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(addedEmployeeDto, HttpStatus.CREATED);
    }

    //Get employee
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) {
        EmployeeDto employeeDto = employeeService.getEmployee(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    // Build Get all employees
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmpployees() {
        List<EmployeeDto> employeeList = employeeService.getAllEmployee();
        return ResponseEntity.ok(employeeList);
    }

    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto updatedEmployee) {
        EmployeeDto updatedEmployeeObj = employeeService.updateEmployee(employeeId, updatedEmployee);
        return ResponseEntity.ok(updatedEmployeeObj);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Long> deleteEmployee(@PathVariable("id") Long employeeId) {
        Long deletedEmployee = employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok(deletedEmployee);
    }
}
