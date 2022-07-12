import axios from "axios";
const baseUrl = process.env.REACT_APP_URL + "api/ingredients";
//const baseUrl = "/api/ingredients";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const getByQuery = (query) => {
  const request = axios.get(baseUrl, {params: {name: query}});
  return request.then((response) => response.data);
}

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
  getByQuery,
  create,
  update,
};
