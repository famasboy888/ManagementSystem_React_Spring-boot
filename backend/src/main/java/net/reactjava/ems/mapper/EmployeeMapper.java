package net.reactjava.ems.mapper;
import net.reactjava.ems.dto.EmployeeDto;
import net.reactjava.ems.entity.Employee;


public class EmployeeMapper {
    private EmployeeMapper() {
    }

    public static EmployeeDto mapToEmployeeDto(Employee emp) {
        return new EmployeeDto(
                emp.getId(),
                emp.getFirstName(),
                emp.getLastName(),
                emp.getEmail()
        );
    }

    public static Employee mapToEmployee(EmployeeDto dto) {
        return new Employee(
                dto.getId(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail()
        );
    }
}
