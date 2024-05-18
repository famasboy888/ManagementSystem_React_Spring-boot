import React, { useEffect, useState } from "react";
import { deleteEmployyee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function ListEmployeeComponent() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  useEffect(() => {
    listEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUpdateButtons = (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
  };

  const handleDeleteButtons = (employeeId) => {
    deleteEmployyee(employeeId)
      .then((res) => {
        console.log(res.data);
        let newEmployees = employees.filter(
          (employee) => employee.id !== res.data
        );
        setEmployees(newEmployees);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container ">
      <br />
      <br />
      <br />
      <button
        type="button"
        onClick={() => handleAddEmployee()}
        className="btn btn-primary mb-2 "
      >
        Add Employee
      </button>
      <h2>List of Employees</h2>
      <table className="table table-hover table-bordered ">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mail</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees?.length > 0 ? (
            employees.map((data) => (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>
                  <button
                    className="btn btn-info action-button"
                    onClick={() => handleUpdateButtons(data.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger action-button"
                    onClick={() => handleDeleteButtons(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No data found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployeeComponent;
