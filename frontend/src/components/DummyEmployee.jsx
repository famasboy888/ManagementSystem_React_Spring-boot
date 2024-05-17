import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../services/EmployeeService";

const DummyEmployeeComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleBack = () => {
    navigate("/");
  };

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

  return (
    <div>
      <h1>Employee ID: {id ? id : "No id!"}</h1>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
      <button onClick={() => handleBack()}>Back to Home</button>
    </div>
  );
};

export default DummyEmployeeComponent;
