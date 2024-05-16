package net.reactjava.ems.dto;
import lombok.*;


@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
