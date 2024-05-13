package net.reactjava.ems.controller;

import lombok.AllArgsConstructor;
import net.reactjava.ems.dto.EmployeeDto;
import net.reactjava.ems.services.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
