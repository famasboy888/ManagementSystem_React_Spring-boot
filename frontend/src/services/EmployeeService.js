import axios from "axios";

const base_uri = import.meta.env.VITE_REST_API_BASE_URL;

export const listEmployees = () => axios.get(`${base_uri}/api/employees`);

export const addEmployee = (employee) =>
  axios.post(`${base_uri}/api/employees`, employee);

export const getEmployee = (employeeId) =>
  axios.get(`${base_uri}/api/employees/${employeeId}`);

export const updateEmployee = (employeeId, employee) =>
  axios.put(`${base_uri}/api/employees/${employeeId}`, employee);

export const deleteEmployyee = (employeeId) =>
  axios.delete(`${base_uri}/api/employees/${employeeId}`);
