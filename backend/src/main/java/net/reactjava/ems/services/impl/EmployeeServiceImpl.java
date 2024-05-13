package net.reactjava.ems.services.impl;

import lombok.AllArgsConstructor;
import net.reactjava.ems.dto.EmployeeDto;
import net.reactjava.ems.entity.Employee;
import net.reactjava.ems.mapper.EmployeeMapper;
import net.reactjava.ems.repository.EmployeeRepository;
import net.reactjava.ems.services.EmployeeService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployee(Long employeeId) {
        return null;
    }
}
