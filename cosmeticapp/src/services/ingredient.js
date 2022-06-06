import axios from "axios";
const baseUrl = process.env.REACT_APP_URL + "api/ingredients";
//const baseUrl = "/api/ingredients";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = (name) => {
  const request = axios.get(`${baseUrl}/${name}`);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  getOne,
  create,
  update,
};
