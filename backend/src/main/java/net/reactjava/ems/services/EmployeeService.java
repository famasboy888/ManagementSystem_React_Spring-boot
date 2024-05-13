package net.reactjava.ems.services;

import net.reactjava.ems.dto.EmployeeDto;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployee(Long employeeId);
}
