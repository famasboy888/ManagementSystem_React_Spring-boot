package net.reactjava.ems;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.reactjava.ems.dto.EmployeeDto;
import net.reactjava.ems.entity.Employee;
import net.reactjava.ems.exception.ResourceNotFoundException;
import net.reactjava.ems.repository.EmployeeRepository;
import net.reactjava.ems.services.EmployeeService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
class BackendApplicationTests {

    @MockBean
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private MockMvc mockMvc;

    ObjectMapper mapper = new ObjectMapper();

    @Test
    public void EmployeeController_AddEmployeeTest() throws Exception {
        Employee employee = Employee.builder().firstName("Jane").lastName("Smith").build();
        EmployeeDto employeeDto = EmployeeDto.builder().firstName("Jane").lastName("Smith").build();
        when(employeeRepository.save(Mockito.any(Employee.class))).thenReturn(employee);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(employeeDto)))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void EmployeeController_GetAllEmpployeesTest() throws Exception {
        when(employeeRepository.findAll()).thenReturn(Stream.of(
                new Employee(Long.parseLong("100"), "Mary", "Jane", "mary@jane.com"),
                new Employee(Long.parseLong("101"), "John", "Smith", "john@smith.com"),
                new Employee(Long.parseLong("103"), "Peter", "Parker", "imnotspidey@man.com")
        ).collect(Collectors.toList()));

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(3)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName").value("Mary"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].firstName").value("John"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[2].firstName").value("Peter"));
    }

    @Test
    public void EmployeeController_GetEmployeeByIdTest() throws Exception {
        Long id = Long.parseLong("101");

        Employee employee = Employee.builder().id(id).firstName("Jane").lastName("Smith").build();
        EmployeeDto.builder().id(id).firstName("Janes").lastName("Smiths").build();

        when(employeeRepository.findById(id)).thenReturn(Optional.ofNullable(employee));

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/employees/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Jane"));
    }

    @Test
    public void EmployeeController_UpdateEmployeeTest() throws Exception {
        Long id = Long.parseLong("101");

        Employee employee = Employee.builder().id(id).firstName("Jane").lastName("Smith").build();
        EmployeeDto employeeDto = EmployeeDto.builder().id(id).firstName("Janes").lastName("Smiths").build();

        when(employeeRepository.findById(id)).thenReturn(Optional.ofNullable(employee));
        when(employeeRepository.save(Mockito.any(Employee.class))).thenReturn(employee);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/employees/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(employeeDto)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Janes"));
    }

    @Test
    public void EmployeeController_DeleteEmployeeTest() throws Exception {
        Long id = Long.parseLong("101");

        Employee employee = Employee.builder().id(id).firstName("Jane").lastName("Smith").build();
        when(employeeRepository.findById(id)).thenReturn(Optional.ofNullable(employee));
        doNothing().when(employeeRepository).deleteById(id);

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/employees/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void EmployeeServiceImpl_GetAllEmpployeesTest() {
        when(employeeRepository.findAll()).thenReturn(Stream.of(
                new Employee(Long.parseLong("100"), "Mary", "Jane", "mary@jane.com"),
                new Employee(Long.parseLong("101"), "John", "Smith", "john@smith.com"),
                new Employee(Long.parseLong("103"), "Peter", "Parker", "imnotspidey@man.com")
        ).collect(Collectors.toList()));

        Assertions.assertThat(employeeService.getAllEmployee()).hasSize(3);
    }

    @Test
    public void EmployeeServiceImpl_GetEmployeeTest() {
        Long id = Long.parseLong("101");

        Employee employee = Employee.builder().id(id).firstName("Jane").lastName("Smith").build();

        when(employeeRepository.findById(id)).thenReturn(Optional.ofNullable(employee));

        employeeService.getEmployee(id);

        Assertions.assertThat(employeeService.getEmployee(id)).isNotNull();
        assert employee != null;
        Assertions.assertThat(employeeService.getEmployee(id).getFirstName()).isEqualTo(employee.getFirstName());
        Assertions.assertThat(employeeService.getEmployee(id).getLastName()).isEqualTo(employee.getLastName());
        Assertions.assertThat(employeeService.getEmployee(id).getEmail()).isEqualTo(employee.getEmail());
    }

    @Test
    public void EmployeeServiceImpl_CreateEmployeeTest() {
        Employee employee = Employee.builder().firstName("Jane").lastName("Smith").build();
        EmployeeDto employeeDto = EmployeeDto.builder().firstName("Jane").lastName("Smith").build();

        when(employeeRepository.save(Mockito.any(Employee.class))).thenReturn(employee);

        EmployeeDto employeeDto1 = employeeService.createEmployee(employeeDto);

        Assertions.assertThat(employeeDto1).isNotNull();
        Assertions.assertThat(employeeDto1.getFirstName()).isEqualTo(employee.getFirstName());
        Assertions.assertThat(employeeDto1.getLastName()).isEqualTo(employee.getLastName());
        Assertions.assertThat(employeeDto1.getEmail()).isEqualTo(employee.getEmail());
    }

    @Test
    public void EmployeeServiceImpl_UpdateEmployeeTest() {
        Long id = Long.parseLong("101");

        Employee employee = Employee.builder().id(id).firstName("Jane").lastName("Smith").build();
        EmployeeDto employeeDto = EmployeeDto.builder().id(id).firstName("Janes").lastName("Smiths").build();

        when(employeeRepository.findById(id)).thenReturn(Optional.ofNullable(employee));
        when(employeeRepository.save(Mockito.any(Employee.class))).thenReturn(employee);

        EmployeeDto employeeDto1 = employeeService.updateEmployee(id, employeeDto);

        Assertions.assertThat(employeeDto1).isNotNull();
        assert employee != null;
        Assertions.assertThat(employeeDto1.getFirstName()).isEqualTo(employee.getFirstName());
        Assertions.assertThat(employeeDto1.getLastName()).isEqualTo(employee.getLastName());
        Assertions.assertThat(employeeDto1.getEmail()).isEqualTo(employee.getEmail());
    }

    @Test
    public void EmployeeServiceImpl_UpdateEmployeeTest_ThrowExceptionError() {
        Long id = Long.parseLong("101");
        Long wrongId = Long.parseLong("111");

        Employee employee = Employee.builder().id(id).firstName("Jane").lastName("Smith").build();
        EmployeeDto employeeDto = EmployeeDto.builder().id(id).firstName("Janes").lastName("Smiths").build();

        when(employeeRepository.findById(id)).thenReturn(Optional.ofNullable(employee));
        when(employeeRepository.save(Mockito.any(Employee.class))).thenReturn(employee);

        ResourceNotFoundException resourceNotFoundException = assertThrows(ResourceNotFoundException.class, () -> employeeService.updateEmployee(wrongId, employeeDto));

        Assertions.assertThat(resourceNotFoundException.getMessage()).contains("Employee with id " + wrongId + " not found");
    }

    @Test
    public void EmployeeServiceImpl_DeleteEmployeeTest() {
        Long id = Long.parseLong("101");

        Employee employee = Employee.builder().id(id).firstName("Jane").lastName("Smith").build();
        when(employeeRepository.findById(id)).thenReturn(Optional.ofNullable(employee));

        doNothing().when(employeeRepository).deleteById(id);
        employeeService.deleteEmployee(id);
        verify(employeeRepository, times(1)).deleteById(id);
    }

    @Test
    public void EmployeeServiceImpl_DeleteEmployeeTest_ThrowExceptionError() {
        Long id = Long.parseLong("101");
        Long wrongId = Long.parseLong("111");

        Employee employee = Employee.builder().id(id).firstName("Jane").lastName("Smith").build();
        when(employeeRepository.findById(id)).thenReturn(Optional.ofNullable(employee));

        doNothing().when(employeeRepository).deleteById(id);

        ResourceNotFoundException resourceNotFoundException = assertThrows(ResourceNotFoundException.class, () -> employeeService.deleteEmployee(wrongId));

        Assertions.assertThat(resourceNotFoundException.getMessage()).contains("Employee with id " + wrongId + " not found");
    }

    //Not really needed
    @Test
    public void main() {
        BackendApplication.main(new String[] {});
        Assertions.assertThat(true).isTrue();
    }

}
