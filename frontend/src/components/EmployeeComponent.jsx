import React, { useEffect, useState } from "react";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();

  const [error, setError] = useState({
    firstName_status: "",
    lastName_status: "",
    email_status: "",
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((res) => {
          let employee = res.data;
          setFirstName(employee.firstName);
          setLastName(employee.lastName);
          setEmail(employee.email);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = {
        firstName,
        lastName,
        email,
      };

      if (id) {
        updateEmployee(id, employee)
          .then((res) => {
            console.log(res.data);
            navigate("/employees");
          })
          .catch((err) => console.error(err));
      }

      addEmployee(employee)
        .then((res) => {
          console.log(res.data);
          navigate("/employees");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const validateForm = () => {
    let valid = true;

    const errorCopy = { ...error };

    if (firstName.trim()) {
      errorCopy.firstName_status = "";
    } else {
      errorCopy.firstName_status = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorCopy.lastName_status = "";
    } else {
      errorCopy.lastName_status = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorCopy.email_status = "";
    } else {
      errorCopy.email_status = "Email is required";
      valid = false;
    }

    setError(errorCopy);

    return valid;
  };

  const updatePageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    }
    return <h2 className="text-center">Add Employee</h2>;
  };

  return (
    <div className="container ">
      <br />
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <br />
          {updatePageTitle()}
          <div className="card-body">
            <form action="">
              <div className="form-group mb-2 ">
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  className={`form-control ${
                    error.firstName_status ? "is-invalid" : ""
                  }`}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                {error.firstName_status && (
                  <div className="invalid-feedback">
                    {error.firstName_status}
                  </div>
                )}
              </div>
              <div className="form-group mb-2 ">
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Last name"
                  name="lastName"
                  className={`form-control ${
                    error.lastName_status ? "is-invalid" : ""
                  }`}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                {error.lastName_status && (
                  <div className="invalid-feedback">
                    {error.lastName_status}
                  </div>
                )}
              </div>
              <div className="form-group mb-2 ">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter Last name"
                  name="email"
                  className={`form-control ${
                    error.email_status ? "is-invalid" : ""
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {error.email_status && (
                  <div className="invalid-feedback">{error.email_status}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
